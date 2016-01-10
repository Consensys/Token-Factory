var config = require('./config.js');

module.exports = {
    AccountBadge: require('./components/AccountBadge.jsx'),
    AccountStore: require('./flux/AccountStore.js'),

    enablePersona: function() {
        config.personaEnabled = true;
    },

    disablePersona: function() {
        config.personaEnabled = false;
    },
    
    setWeb3Provider: function(host) {
        config.web3Provider = host;
    },

    setIpfsProvider: function(host) {
        config.ipfsProvider = host;
    },

    setPersonaRegistry: function(registry) {
        config.personaRegistry = registry;
    },

    setPersonaCacheTimeout: function(timeout) {
        config.personaCacheTimeout = timeout;
    },
};
