var HumanStandardTokenFactory = artifacts.require("./HumanStandardTokenFactory.sol");

module.exports = function(deployer) {
  deployer.deploy(HumanStandardTokenFactory);
};
