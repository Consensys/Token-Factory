"use strict";

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var factory = function factory(Pudding) {
  // Inherit from Pudding. The dependency on Babel sucks, but it's
  // the easiest way to extend a Babel-based class. Note that the
  // resulting .js file does not have a dependency on Babel.

  var PersonaRegistry = (function (_Pudding) {
    _inherits(PersonaRegistry, _Pudding);

    function PersonaRegistry() {
      _classCallCheck(this, PersonaRegistry);

      _get(Object.getPrototypeOf(PersonaRegistry.prototype), "constructor", this).apply(this, arguments);
    }

    return PersonaRegistry;
  })(Pudding);

  ;

  // Set up specific data for this class.
  PersonaRegistry.abi = [{ "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "idLookup", "outputs": [{ "name": "", "type": "address" }], "type": "function" }, { "constant": false, "inputs": [{ "name": "contractAddress", "type": "address" }], "name": "registerPersona", "outputs": [], "type": "function" }, { "constant": true, "inputs": [], "name": "version", "outputs": [{ "name": "", "type": "uint256" }], "type": "function" }, { "constant": false, "inputs": [], "name": "removePersona", "outputs": [], "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "idList", "outputs": [{ "name": "", "type": "address" }], "type": "function" }, { "constant": false, "inputs": [], "name": "getIdList", "outputs": [{ "name": "", "type": "address[]" }], "type": "function" }, { "inputs": [], "type": "constructor" }];
  PersonaRegistry.binary = "6060604052600060028190556001805482825582908015829011604057818360005260206000209182019101604091905b8082111560525783815584016030565b5050505061044e806100566000396000f35b509056606060405236156100565760e060020a600035046318357c6d811461005857806348d665b31461007957806354fd4d50146101495780635cee14d1146101525780636313531f1461027a578063ac0fc11c146102ae575b005b61031c600435600060208190529081526040902054600160a060020a031681565b6100566004356000600082915081600160a060020a0316638da5cb5b6040518160e060020a0281526004018090506020604051808303816000876161da5a03f11561000257505060405151915050600160a060020a0381811633909116141561041457600160a060020a0381811660009081526020819052604081205490911614156103eb57600180548082018083559091908280158290116103955760008390526103959060008051602061042e8339815191529081019083015b808211156104195760008155600101610135565b61033960025481565b33600160a060020a0390811660009081526020819052604081205461005692829116811461019a57604081208054600160a060020a03198116909155600160a060020a031691505b5060005b60015481101561041d5733600160a060020a031660016000508281548110156100025760009190915260008051602061042e8339815191520154600160a060020a03161415610426576001805460001981019081101561000257815460008051602061042e8339815191529190910154600160a060020a0316919083908110156100025760008051602061042e833981519152018054600160a060020a0319169290921790915580546000198101808355909190828015829011610421576104219060008051602061042e833981519152908101908301610135565b61031c600435600180548290811015610002575060005260008051602061042e8339815191520154600160a060020a031681565b61034b60408051602081810183526000825282516001805480840283018401909552848252929390929183018282801561031257602002820191906000526020600020905b8154600160a060020a03168152600191909101906020018083116102f3575b5050505050905090565b60408051600160a060020a03929092168252519081900360200190f35b60408051918252519081900360200190f35b60405180806020018281038252838181518152602001915080519060200190602002808383829060006004602084601f0104600302600f01f1509050019250505060405180910390f35b505060018054849350909150600019810190811015610002575080546000919091527fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf5018054600160a060020a03191690911790555b600160a060020a03811660009081526020819052604090208054600160a060020a031916841790555b505050565b5090565b5050565b505050505b60010161019e56b10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf6";

  if ("0xcd7e9bfd1c57db21e2b4f1e220d371a716079fea" != "") {
    PersonaRegistry.address = "0xcd7e9bfd1c57db21e2b4f1e220d371a716079fea";

    // Backward compatibility; Deprecated.
    PersonaRegistry.deployed_address = "0xcd7e9bfd1c57db21e2b4f1e220d371a716079fea";
  }

  PersonaRegistry.generated_with = "1.0.2";
  PersonaRegistry.contract_name = "PersonaRegistry";

  return PersonaRegistry;
};

// Nicety for Node.
factory.load = factory;

if (typeof module != "undefined") {
  module.exports = factory;
} else {
  // There will only be one version of Pudding in the browser,
  // and we can use that.
  window.PersonaRegistry = factory;
}