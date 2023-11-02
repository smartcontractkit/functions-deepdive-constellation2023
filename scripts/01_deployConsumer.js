const { abi, bytecode } = require("../contracts/abi/FunctionsConsumer.json");
const { wallet, signer } = require("../connection.js");
const { networks } = require("../networks.js");
const { ContractFactory, utils } = require("ethers");

const NETWORK = "polygonMumbai";

const routerAddress = networks[NETWORK].functionsRouter;
const donIdBytes32 = utils.formatBytes32String(networks[NETWORK].donId);

const deployFunctionsConsumerContract = async () => {
  const contractFactory = new ContractFactory(abi, bytecode, wallet);

  console.log(`\nDeploying functions consumer contract on '${NETWORK}'...`);
  const functionsConsumerContract = await contractFactory
    .connect(signer)
    .deploy(routerAddress, donIdBytes32);

  await functionsConsumerContract.deployed();
  console.log(
    `Contract deployed at address: ${functionsConsumerContract.address}`
  );
  
  return functionsConsumerContract;
};

deployFunctionsConsumerContract().catch(err => {
  console.log("\nError deploying Functions Consumer contract: ", err);
});
