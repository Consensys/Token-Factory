//for Mist & Metamask support
var Web3 = require("web3");
var Pudding = require("ether-pudding");
//var uportLib = require('uport-lib');
var exported_web3 = null;

window.offline = true; //default is there is no web3 available.
window.ls = localStorage; //for debugging

//TODO: add in flag to ALSO attach to a local node, besides through metamask.

if (typeof web3 !== 'undefined') {
  // Use the Mist/wallet provider as it is available
  console.log("provider is available");
  exported_web3 = new Web3(web3.currentProvider);
  window.offline = false; //there is a web3 available.
  localStorage["provider"] = "metamask";

} else {
  //If not available, check if the user has set to use uPort (localstorage).
  if(localStorage["provider"] == "uport") {
    /*var uport = new uportLib("Token Factory");
    var uportProvider = uport.getUportProvider();
    exported_web3 = new Web3(uportProvider);
    window.offline = false;*/
  } else {
    //redirect to front-page?
    console.log("A web3 provider is NOT present. Telling user to get one.");
    console.log("For now. NOT connected to a localhost.");
    console.log("THUS. Offline flag remains TRUE.");
    exported_web3 = new Web3();
  }

  //If not -> set offline and prompt to set provider.
  // Use uPort if MetaMask is not available

  //ONLY set web3 for its functions, not for its connection
}

Pudding.setWeb3(exported_web3); //Pudding requires a web3 connection
window.exported = exported_web3; //used for debugging purposes to get access to web3 ie exported.eth.<blah blah blah>
module.exports = exported_web3;
