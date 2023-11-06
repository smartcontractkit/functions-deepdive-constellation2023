require("@nomiclabs/hardhat-etherscan");
const { networks } = require("./networks");

const SOLC_SETTINGS = {
  optimizer: {
    enabled: true,
    runs: 1_000,
  },
};

module.exports = {
  networks: {
    ...networks,
  },
  solidity: {
    compilers: [
      {
        version: "0.8.22",
        settings: SOLC_SETTINGS,
      },
      {
        version: "0.8.19",
        settings: SOLC_SETTINGS,
      },
      
    ],
  },
  etherscan: {
    apiKey: {
      polygonMumbai: networks.polygonMumbai.verifyApiKey,
    },
  },
};
