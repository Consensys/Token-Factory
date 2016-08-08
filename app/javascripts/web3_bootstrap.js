//for Mist & Metamask support
var Web3 = require("web3");
var Pudding = require("ether-pudding");
var exported_web3 = null;

window.offline = true; //default is there is no web3 available.

//TODO: add in flag to ALSO attach to a local node, besides through metamask.

if (typeof web3 !== 'undefined') {
  // Use the Mist/wallet provider as it is available
  exported_web3 = new Web3(web3.currentProvider);
  window.offline = false; //there is a web3 available.

} else {

  console.log("A web3 provider is NOT present. Telling user to get one.");
  console.log("For now. NOT connected to a localhost.");
  console.log("THUS. Offline flag remains TRUE.");

  //ONLY set web3 for its functions, not for its connection
  exported = new Web3();
}

Pudding.setWeb3(exported); //Pudding requires a web3 connection
window.exported = exported; //used for debugging purposes to get access to web3 ie exported.eth.<blah blah blah>
module.exports = exported;
