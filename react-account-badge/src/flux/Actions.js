var AppDispatcher = require('./AppDispatcher.js');
var Constants     = require('./Constants.js');

var Actions = {

    deserializeLightWallet: function(serialized) {
        AppDispatcher.handleViewAction({
            type: Constants.DESERIALIZE_LIGHT_WALLET,
            serialized: serialized
        });
    },

    removeLwFromLocalStorage: function() {
        AppDispatcher.handleViewAction({
            type: Constants.REMOVE_LW_FROM_LOCAL_STORAGE
        });
    },

    addNodeAddresses: function(addresses) {
        AppDispatcher.handleViewAction({
            type: Constants.ADD_NODE_ADDRESSES,
            addresses: addresses
        });
    },

    newNodeAddress: function(address) {
        AppDispatcher.handleViewAction({
            type: Constants.NEW_NODE_ADDRESS,
            address: address
        });
    },

    newLwAddress: function(pwd) {
        AppDispatcher.handleViewAction({
            type: Constants.NEW_LW_ADDRESS,
            password: pwd
        });
    },

    newLightWalletEntropy: function(entropy) {
        AppDispatcher.handleViewAction({
            type: Constants.NEW_LIGHT_WALLET_ENTROPY,
            entropy: entropy
        });
    },

    newLightWallet: function(pwd, seed) {
        AppDispatcher.handleViewAction({
            type: Constants.NEW_LIGHT_WALLET,
            password: pwd,
            seed: seed
        });
    },

    loadLightWalletFromSeed: function(pwd, seed) {
        AppDispatcher.handleViewAction({
            type: Constants.LOAD_LIGHT_WALLET_FROM_SEED,
            password: pwd,
            seed: seed
        });
    },

    retrieveSeed: function(pwd) {
        AppDispatcher.handleViewAction({
            type: Constants.RETRIEVE_SEED,
            password: pwd,
        });
    },

    setSelectedAddress: function(address) {
        AppDispatcher.handleViewAction({
            type: Constants.SELECTED_ADDRESS,
            selectedAddress: address
        });
    },
};

module.exports = Actions;

