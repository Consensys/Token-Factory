var EventEmitter  = require('events').EventEmitter;
var assign        = require('object-assign');
var ethlightjs    = require('eth-lightwallet');

var AppDispatcher = require('./AppDispatcher');
var Constants     = require('./Constants.js');

var CHANGE_EVENT = 'change';
var ERROR_EVENT  = 'error';

var _nodeAddresses = [];
var _lwAddresses   = [];

var _selectedAddress = '';

var _tempSeed;
var _keystore;
var _lastError;

function addNodeAddress(address) {
    _nodeAddresses.push(address);
}

function addNodeAddresses(addresses) {
    addresses.forEach(function(address) {
        _nodeAddresses.push(address);
    });
}

function clearLwAddresses() {
    _lwAddresses = [];
}

function addLwAddresses(addresses) {
    addresses.forEach(function(address) {
        _lwAddresses.push(address);
    });
}

function newLightWalletEntropy(entropy) {
    _tempSeed = ethlightjs.keystore.generateRandomSeed(entropy);
}

function newLightWallet(password, seed) {
    clearLwAddresses();
    _keystore = new ethlightjs.keystore(seed, password);
    _keystore.generateNewAddress(password, 1);
    addLwAddresses(_keystore.getAddresses());
    saveLwToLocalStorage();
}

function newLwAddress(pwd) {
    _keystore.generateNewAddress(pwd, 1);
    var addrs = _keystore.getAddresses();
    _lwAddresses.push(addrs[addrs.length - 1]);
    saveLwToLocalStorage();
}

function deserializeLightWallet(serialized) {
    clearLwAddresses();
    _keystore = ethlightjs.keystore.deserialize(serialized);
    addLwAddresses(_keystore.getAddresses());
    saveLwToLocalStorage();
}

function saveLwToLocalStorage() {
    var serialized = _keystore.serialize();
    localStorage.setItem(Constants.LOCAL_STORAGE_NAME, serialized);
}

function removeLwFromLocalStorage() {
    localStorage.removeItem(Constants.LOCAL_STORAGE_NAME);
    clearLwAddresses();
}

function loadLightWalletFromSeed(password, seed) {
    newLightWallet(password, seed);
}

function retrieveSeed(password) {
    _tempSeed = _keystore.getSeed(password);
}

function setSelected(address) {
    _selectedAddress = address;
}

var AccountStore = assign({}, EventEmitter.prototype, {

    getNodeAddresses: function() {
        return _nodeAddresses;
    },

    getSelectedAddress: function() {
        return _selectedAddress;
    },

    getKeystore: function() {
        return _keystore;
    },

    getLwAddresses: function() {
        if (_lwAddresses.length == 0) {
            // tries to load from local storage
            var serialized = localStorage.getItem(Constants.LOCAL_STORAGE_NAME);
            if (serialized) {
                try {
                    deserializeLightWallet(serialized);
                } catch (err) {
                    localStorage.setItem(Constants.LOCAL_STORAGE_NAME, null);
                    console.log(err);
                }
            }
        }
        return _lwAddresses;
    },

    getTempSeed: function() {
        var seed = _tempSeed;
        _tempSeed = null; // don't let seed around
        return seed;
    },

    getSerializedLightWallet: function() {
        return _keystore.serialize();
    },

    isInitialized: function() {
        return _nodeAddresses.length > 0 || _lwAddresses.length > 0;
    },

    getLastError: function() {
        return _lastError;
    },

    emitChange: function() {
        _lastError = null;
        this.emit(CHANGE_EVENT);
    },

    emitError: function() {
        this.emit(ERROR_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    addErrorListener: function(callback) {
        this.on(ERROR_EVENT, callback);
    },

    removeErrorListener: function(callback) {
        this.removeListener(ERROR_EVENT, callback);
    },

    dispatcherIndex: AppDispatcher.register(function(payload) {
        var action = payload.action;
        try {
            switch(action.type) {
                case Constants.ADD_NODE_ADDRESSES:
                    addNodeAddresses(action.addresses);
                    break;
                case Constants.DESERIALIZE_LIGHT_WALLET:
                    deserializeLightWallet(action.serialized);
                    break;
                case Constants.REMOVE_LW_FROM_LOCAL_STORAGE:
                    removeLwFromLocalStorage();
                    break;
                case Constants.NEW_NODE_ADDRESS:
                    addNodeAddress(action.address);
                    break;
                case Constants.NEW_LW_ADDRESS:
                    newLwAddress(action.password);
                    break;
                case Constants.NEW_LIGHT_WALLET_ENTROPY:
                    newLightWalletEntropy(action.entropy);
                    break;
                case Constants.NEW_LIGHT_WALLET:
                    newLightWallet(action.password, action.seed);
                    break;
                case Constants.LOAD_LIGHT_WALLET_FROM_SEED:
                    loadLightWalletFromSeed(action.password, action.seed);
                    break;
                case Constants.RETRIEVE_SEED:
                    retrieveSeed(action.password);
                    break;
                case Constants.SELECTED_ADDRESS:
                    setSelected(action.selectedAddress);
                    break;
            }
            AccountStore.emitChange();
        } catch (err) {
            _lastError = ''+err;
            console.error(err);
            AccountStore.emitError();
        }
        return true;
    })

});

AccountStore.setMaxListeners(20);

module.exports = AccountStore;
