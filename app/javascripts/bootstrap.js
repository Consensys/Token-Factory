//for Mist & Metamask support
var Web3 = require("web3");
var Pudding = require("ether-pudding");
var exported = null;

// Bootstrap
if (typeof web3 !== 'undefined') {
  // Use the Mist/wallet provider.
  exported = new Web3(web3.currentProvider);
} else {
  // Use the provider from the config.
  // ENV and WEB3_PROVIDER_LOCATION are rewritten by webpack during build
  if (ENV == "development") {
    //exported = new Web3(new Web3.providers.HttpProvider(WEB3_PROVIDER_LOCATION));
    exported = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
  }
}

Pudding.setWeb3(exported);
window.exported = exported;
module.exports = exported;
