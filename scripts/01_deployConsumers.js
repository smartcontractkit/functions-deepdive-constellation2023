const { abi, bytecode } = require("../contracts/abi/FunctionsConsumer.json");
const { wallet, signer } = require("../connection.js");
const { networks } = require("../networks.js");
const { ContractFactory, utils } = require("ethers");

const NETWORK = "polygonMumbai";

const routerAddress = networks[NETWORK].functionsRouter;
const donIdBytes32 = utils.formatBytes32String(networks[NETWORK].donId);

const deployFunctionsConsumerContract = async () => {
  const contractFactory = new ContractFactory(abi, bytecode, wallet);

  console.log(
    `\nDeploying FunctionsConsumer contract on network ${NETWORK}...`
  );
  const functionsConsumerContract = await contractFactory
    .connect(signer)
    .deploy(routerAddress, donIdBytes32);

  await functionsConsumerContract.deployed();
  console.log(`\nDeployed at address ${functionsConsumerContract.address}`)
};

deployFunctionsConsumerContract().catch(err => {
  console.log("Error deploying the Consumer Contract ", err);
});
