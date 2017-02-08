var HumanStandardTokenFactory = artifacts.require("./HumanStandardTokenFactory.sol");
var HumanStandardToken = artifacts.require("./HumanStandardToken.sol");

module.exports = function(deployer) {
  deployer.deploy(HumanStandardTokenFactory);
  deployer.deploy(HumanStandardToken);
};
