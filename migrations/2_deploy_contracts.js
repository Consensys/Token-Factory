var MeshStandardToken = artifacts.require("./MeshStandardToken.sol");
var HumanStandardToken = artifacts.require("./HumanStandardToken.sol");

module.exports = function(deployer) {
  deployer.deploy(MeshStandardToken);
  deployer.deploy(HumanStandardToken);
};
