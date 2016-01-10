
var Persona = require('../lib/persona.js')
var Web3 = require('web3')
var web3 = new Web3();
var ipfs = require('ipfs-js')
var pudding = require('ether-pudding')
pudding.setWeb3(web3);
var Promise = require('bluebird')
var personaInfo = require('./persona_example.json')

var web3prov = new web3.providers.HttpProvider('http://localhost:8545');
web3.setProvider(web3prov);
var ipfsProv = require('ipfs-api')('localhost', '5001');
ipfs.setProvider(ipfsProv);

var personaRegContr = require('../config/development/contracts.json')

var personaRegistry = pudding.whisk(personaRegContr.PersonaRegistry.abi, personaRegContr.PersonaRegistry.binary)

describe('Higher-level Persona APIs', function () {

  it("Creates personas and reads info", function(done) {
    
    this.timeout(10000);
    
    var personaInstance;
    web3.eth.getAccounts(function(err, acct) {
      var personas = [];

      personaRegistry.new({from: acct[0]}).then(function (personaReg) {
        Persona.setRegistry(personaReg.address);
        //console.log('PersonaRegistry: ' + personaReg.address);

        var personaPromises = [Persona.newPersona(personaInfo.kobe, {from: acct[0]}),
                               Persona.newPersona(personaInfo.lebron, {from: acct[1]}),
                               Persona.newPersona(personaInfo.shaq, {from: acct[2]})];
        
        return Promise.all(personaPromises);
      }).then(function() {
        // Check that we can recover the Persona info
        return Persona.of(acct[0]);
      }).then(function(persona0) {
        return persona0.getInfo();
      }).then(function(info) {
        assert.strictEqual(info.schemaPerson.name, 'Kobe Bryant');
        return Persona.of(acct[1])
      }).then(function(persona1) {
        return persona1.getInfo();
      }).then(function(info) {
        assert.strictEqual(info.schemaPerson.name, 'Lebron James');
        return Persona.of(acct[2])
      }).then(function(persona2) {
        personaInstance = persona2;
        return persona2.getInfo();
      }).then(function(info) {
        assert.strictEqual(info.schemaPerson.name, "Shaquille O'Neal");
        // Change the name
        info.schemaPerson.name = "New Name";
        
        return personaInstance.updateInfo(info, {from: acct[2]});
      }).then(function() {
        return personaInstance.getInfo();
      }).then(function(info) {
        assert.strictEqual(info.schemaPerson.name, 'New Name');
        done();
      }) 
        
    });

  });

});

