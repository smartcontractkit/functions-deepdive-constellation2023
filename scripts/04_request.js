const { Contract } = require("ethers");
const fs = require("fs");
const path = require("path");
const { Location } = require("@chainlink/functions-toolkit");
require("@chainlink/env-enc").config();

const { signer } = require("../connection.js");
const { abi } = require("../contracts/abi/FunctionsConsumer.json");

// require('dotenv').config()

const consumerAddress = "0x35c14267Ea142bCf1e784A0CdeF83dEcc73988BF"; // TODO @dev
const encryptedSecretsReference =
  "0xa266736c6f744964006776657273696f6e1a65486dd4"; // TODO @dev get this from previous step
const subscriptionId = "151"; // TODO @dev

const sendRequest = async () => {
  if (!consumerAddress || !encryptedSecretsReference || !subscriptionId) {
    throw new Error("Please set the variables in script 04");
  }

  // Attach to the FunctionsConsumer contract
  const functionsConsumer = new Contract(consumerAddress, abi, signer);

  const source = fs
    .readFileSync(path.resolve(__dirname, "../source.js"))
    .toString();

  const prompt = "Describe what a blockchain is in 15 words or less";
  const args = [prompt];

  const callbackGasLimit = 300000;

  const requestTx = await functionsConsumer.sendRequest(
    source,
    Location.DONHosted,
    encryptedSecretsReference,
    args,
    [], // bytesArgs - arguments can be encoded off-chain to bytes.
    subscriptionId,
    callbackGasLimit
  );

  const requestTxReceipt = await requestTx.wait(1);

  const requestId = requestTxReceipt.events[2].args.id;

  console.log(
    `\nRequest made. RequestId is: ${requestId}. Tx Hash is ${requestTx.hash}`
  );
};

sendRequest().catch(err => {
  console.log("Error sending the request to Functions Consumer: ", err);
});
