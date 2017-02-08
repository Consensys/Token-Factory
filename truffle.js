var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "<replace with twelve-word mnemonic phrase ... >"; // 12 word mnemonic 
var provider = new HDWalletProvider(mnemonic, "https://ropsten.infura.io/<replace with infura access token>");

// display address to screen to fund for further operations
console.log(provider.getAddress());

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: provider,
      network_id: 3
    }
  }
};
