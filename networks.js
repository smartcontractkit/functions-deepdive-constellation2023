require("@chainlink/env-enc").config()
// require('dotenv').config()

const DEFAULT_VERIFICATION_BLOCK_CONFIRMATIONS = 2;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const SECOND_PRIVATE_KEY = process.env.SECOND_PRIVATE_KEY;

const accounts = [];
if (PRIVATE_KEY) {
  accounts.push(PRIVATE_KEY);
}
if (SECOND_PRIVATE_KEY) {
  accounts.push(SECOND_PRIVATE_KEY);
}

const networks = {
  ethereumSepolia: {
    gasPrice: undefined,
    nonce: undefined,
    accounts,
    verifyApiKey: process.env.ETHERSCAN_API_KEY || "UNSET",
    chainId: 11155111,
    confirmations: DEFAULT_VERIFICATION_BLOCK_CONFIRMATIONS,
    nativeCurrencySymbol: "ETH",
    linkToken: "0x779877A7B0D9E8603169DdbD7836e478b4624789",
    linkPriceFeed: "0x42585eD362B3f1BCa95c640FdFf35Ef899212734", // LINK/ETH
    functionsRouter: "0xb83E47C2bC239B3bf370bc41e1459A34b41238D0",
    donId: "fun-ethereum-sepolia-1",
    gatewayUrls: [
      "https://01.functions-gateway.testnet.chain.link/",
      "https://02.functions-gateway.testnet.chain.link/",
    ],
  },
  polygonMumbai: {
    gasPrice: 20_000_000_000,
    nonce: undefined,
    accounts,
    verifyApiKey: process.env.POLYGONSCAN_API_KEY || "UNSET",
    chainId: 80001,
    confirmations: DEFAULT_VERIFICATION_BLOCK_CONFIRMATIONS,
    nativeCurrencySymbol: "MATIC",
    linkToken: "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
    linkPriceFeed: "0x12162c3E810393dEC01362aBf156D7ecf6159528", // LINK/MATIC
    functionsRouter: "0x6E2dc0F9DB014aE19888F539E59285D2Ea04244C",
    donId: "fun-polygon-mumbai-1",
    gatewayUrls: [
      "https://01.functions-gateway.testnet.chain.link/",
      "https://02.functions-gateway.testnet.chain.link/",
    ],
  },
  avalancheFuji: {
    gasPrice: undefined,
    nonce: undefined,
    accounts,
    verifyApiKey: process.env.FUJI_SNOWTRACE_API_KEY || "UNSET",
    chainId: 43113,
    confirmations: 2 * DEFAULT_VERIFICATION_BLOCK_CONFIRMATIONS,
    nativeCurrencySymbol: "AVAX",
    linkToken: "0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846",
    linkPriceFeed: "0x79c91fd4F8b3DaBEe17d286EB11cEE4D83521775", // LINK/AVAX
    functionsRouter: "0xA9d587a00A31A52Ed70D6026794a8FC5E2F5dCb0",
    donId: "fun-avalanche-fuji-1",
    gatewayUrls: [
      "https://01.functions-gateway.testnet.chain.link/",
      "https://02.functions-gateway.testnet.chain.link/",
    ],
  },
  // localFunctionsTestnet is updated dynamically by scripts/startLocalFunctionsTestnet.js so it should not be modified here
  localFunctionsTestnet: {
    url: "http://localhost:8545/",
    accounts,
    confirmations: 1,
    nativeCurrencySymbol: "ETH",
    linkToken: "0xa0C37a37BEc77B60bbe862F1eAd74DDCBdcaADb0",
    functionsRouter: "0x10a39d4fA07A58dbD3164c9811790c0dAC6DC1B8",
    donId: "local-functions-testnet",
  },
};

module.exports = {
  networks,
};
