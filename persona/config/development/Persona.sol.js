"use strict";

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var factory = function factory(Pudding) {
  // Inherit from Pudding. The dependency on Babel sucks, but it's
  // the easiest way to extend a Babel-based class. Note that the
  // resulting .js file does not have a dependency on Babel.

  var Persona = (function (_Pudding) {
    _inherits(Persona, _Pudding);

    function Persona() {
      _classCallCheck(this, Persona);

      _get(Object.getPrototypeOf(Persona.prototype), "constructor", this).apply(this, arguments);
    }

    return Persona;
  })(Pudding);

  ;

  // Set up specific data for this class.
  Persona.abi = [{ "constant": true, "inputs": [], "name": "isRevoked", "outputs": [{ "name": "", "type": "bool" }], "type": "function" }, { "constant": false, "inputs": [{ "name": "_ipfsHash", "type": "string" }], "name": "setIpfsHash", "outputs": [], "type": "function" }, { "constant": true, "inputs": [], "name": "version", "outputs": [{ "name": "", "type": "uint256" }], "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "type": "function" }, { "constant": false, "inputs": [], "name": "revoke", "outputs": [], "type": "function" }, { "constant": true, "inputs": [], "name": "ipfsHash", "outputs": [{ "name": "", "type": "string" }], "type": "function" }, { "constant": true, "inputs": [], "name": "revocationTimestamp", "outputs": [{ "name": "", "type": "uint256" }], "type": "function" }, { "inputs": [{ "name": "_ipfsHash", "type": "string" }], "type": "constructor" }];
  Persona.binary = "60606040526040516103e63803806103e68339810160405280510160605160008054600160a060020a0319163317815582516001805492819052926020601f6002600019868816156101000201909516949094048401047fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf6908101939091608001908390106100d557805160ff19168380011785555b506100b09291505b808211156101055760008155830161009d565b5050600060028190556003805460ff19169055600455506102dd806101096000396000f35b82800160010185558215610095579182015b828111156100955782518260005055916020019190600101906100e7565b509056606060405236156100615760e060020a60003504632bc9ed0281146100635780634e3b62ec1461006f57806354fd4d501461013c5780638da5cb5b14610145578063b6549f7514610157578063c623674f14610194578063e322a468146101ef575b005b6101f860035460ff1681565b60206004803580820135601f81018490049093026080908101604052606084815261006194602493919291840191819083828082843750949650505050505050600054600160a060020a03908116339091161480156100d1575060035460ff16155b15610273578060016000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061027657805160ff19168380011785555b506102709291505b808211156102a657600081558301610129565b6101f860025481565b6101f8600054600160a060020a031681565b61006160005433600160a060020a03908116911614801561017b575060035460ff16155b15610192576003805460ff19166001179055426004555b565b610202600180546020601f6002600019610100858716150201909316929092049182018190040260809081016040526060828152929190828280156102d55780601f106102aa576101008083540402835291602001916102d5565b6101f860045481565b6060908152602090f35b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f1680156102625780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b50505b50565b82800160010185558215610121579182015b82811115610121578251826000505591602001919060010190610288565b5090565b820191906000526020600020905b8154815290600101906020018083116102b857829003601f168201915b50505050508156";

  if ("" != "") {
    Persona.address = "";

    // Backward compatibility; Deprecated.
    Persona.deployed_address = "";
  }

  Persona.generated_with = "1.0.2";
  Persona.contract_name = "Persona";

  return Persona;
};

// Nicety for Node.
factory.load = factory;

if (typeof module != "undefined") {
  module.exports = factory;
} else {
  // There will only be one version of Pudding in the browser,
  // and we can use that.
  window.Persona = factory;
}