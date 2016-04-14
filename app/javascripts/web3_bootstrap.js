//for Mist & Metamask support
var Web3 = require("web3");
var Pudding = require("ether-pudding");
var exported = null;

// Bootstrap

//hack it. Wait for 2 seconds.

if (typeof web3 !== 'undefined') {
  // Use the Mist/wallet provider.
  exported = new Web3(web3.currentProvider);
  var other_web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8547'));
  window.web_l = other_web3;
} else {
  // Use the provider from the config.
  // ENV and WEB3_PROVIDER_LOCATION are rewritten by webpack during build
  if (ENV == "development") {
    //exported = new Web3(new Web3.providers.HttpProvider(WEB3_PROVIDER_LOCATION));
    console.log("Setting local web3");
    exported = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8546'));
    window.web3 = exported;
    //exported = new Web3(new Web3.providers.HttpProvider('https://rawtestrpc.metamask.io/'));
  }
}

Pudding.setWeb3(exported);
window.exported = exported;
module.exports = exported;
