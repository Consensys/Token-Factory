//for Mist & Metamask support
var Web3 = require("web3");
var Pudding = require("ether-pudding");
var exported = null;

window.offline = true; //default is there is no web3 available.

//TODO: add in flag to ALSO attach to a local node, besides through metamask.

if (typeof web3 !== 'undefined') {
  // Use the Mist/wallet provider.
  exported = new Web3(web3.currentProvider);
  window.offline = false; //there is a web3 available.

  var other_web3 = new Web3(new Web3.providers.HttpProvider('https://rpc.metamask.io'));
  window.web_l = other_web3;
} else {
  // Use the provider from the config.
  // ENV and WEB3_PROVIDER_LOCATION are rewritten by webpack during build
  if (ENV == "development") {

    console.log("A web3 provider is NOT present. Telling user to get one.");
    console.log("For now. Do NOT connected to a localhost.");
    console.log("THUS. Offline flag is remains TRUE.");

    //ONLY set web3 for its functions, not for its connection
    exported = new Web3();
    //exported = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
    window.web3 = exported;
    //exported = new Web3(new Web3.providers.HttpProvider('https://rawtestrpc.metamask.io/'));
  }
}

Pudding.setWeb3(exported);
window.exported = exported;
module.exports = exported;
