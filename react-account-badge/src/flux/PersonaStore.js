var Promise = require('bluebird');
var Persona = require('persona');
var ipfsApi = require('ipfs-api');
var concat  = require('concat-stream');
var web3    = require('web3');

var CACHE_TIMEOUT;
var _cache = {};

var ipfs;

var PersonaStore = {

    init: function(web3Provider, ipfsData, registryAddress, cacheTimeout) {
        Persona.setWeb3Provider(new web3.providers.HttpProvider(web3Provider));
        Persona.setIpfsProvider(ipfsApi(ipfsData.host, ipfsData.port));
        Persona.setRegistry(registryAddress);
        CACHE_TIMEOUT = cacheTimeout || (60 * 60 * 1000); // default: 1h
        ipfs = ipfsApi(ipfsData.host, ipfsData.port);
    },

    get: function(address, forceUpdate) {
        return new Promise(function(resolve, reject) {
            if (!forceUpdate) {
                if (_cache[address]) {
                    if (new Date().getTime() - _cache[address].time < CACHE_TIMEOUT) {
                        log('Cache hit for ' + address);
                        resolve(_cache[address].data);
                        return;
                    } else {
                        log('Cache expired for ' + address);
                    }
                }
            }

            Persona.of(address).then(function(persona) {
                // Persona is the persona contract.
                if (persona.contract.address == '0x0000000000000000000000000000000000000000') {
                    //log('persona contract not found');
                    throw new Error('Persona contract not found');
                } else {
                    //log('found persona: ' + persona.contract.address);
                    return persona.getInfo('personSchema');
                }
            }).then(function(info) {
                // info now has all persona data
                //log(JSON.stringify(info));
                var cu = info.image.contentUrl;
                var hash = cu.substring(cu.indexOf('/') + 1);
                //console.log('hash:' + hash);
                _cache[address] = {};
                _cache[address].time = new Date().getTime();
                _cache[address].data = {};
                _cache[address].data.name = info.name;
                return catIpfs(hash);
            }).then(function(res) {
                _cache[address].data.img = 'data:image/png;base64,' + res;
                resolve(_cache[address].data);
            }).catch(function(error) {
                reject(error);
            });
        });
    }

};

// Code borrowed from Connor's repo: ipfs.js. I'm not using this module
// because it would imply two different types of initialization whether
// you're running it on browser or nodejs.
function catIpfs(hash) {
    return new Promise(function(resolve, reject) {
        Promise.promisify(ipfs.cat)(hash)
        .then(function(res) {
            if (res.readable) {
                res.pipe(concat(function(data) {
                    resolve(data.toString('base64'));
                }));
            } else {
                if (!ipfs.Buffer.isBuffer(res)) {
                    if (typeof res === 'object')
                        res = JSON.stringify(res);
                    if (typeof res !== 'string')
                        throw new Error("ipfs.cat response type not recognized; expecting string, buffer, or object");
                    res = new ipfs.Buffer(res, 'binary');
                }
                // Returned as a string
                resolve(res.toString('base64'));
            }
            
        })
        .catch(function(err) {
            reject(err);
        });
    });
    
}

function log(text) {
    console.log('PersonaStore: ' + text);
}

module.exports = PersonaStore;

