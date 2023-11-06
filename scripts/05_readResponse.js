const { decodeResult, ReturnType } = require("@chainlink/functions-toolkit");
const { Contract } = require("ethers");

const { signer } = require("../connection.js");
const { abi } = require("../contracts/abi/FunctionsConsumer.json");

const consumerAddress = "0x35c14267Ea142bCf1e784A0CdeF83dEcc73988BF"; // TODO @dev get this from step 01

const readResponse = async () => {
  if (!consumerAddress) {
    throw new Error("\nPlease set the consumerAddress variable");
  }

  const functionsConsumer = new Contract(consumerAddress, abi, signer);

  const requestId = await functionsConsumer.s_lastRequestId()
  let responseHex = await functionsConsumer.s_lastResponse();
  let errorHex = await functionsConsumer.s_lastError()
  
  let hexToDecode = responseHex
  if (responseHex === "0x") {
    console.log("\nThere was an error. Decoding the error...");
    hexToDecode = errorHex;
  }
  const responseDataType = ReturnType.string;
  const responseDecoded = decodeResult(hexToDecode, responseDataType);

  console.table({
    "req Id": requestId,
    "Hex to Decode": hexToDecode,
    "GPT Response Decoded":  responseDecoded,
  })
};

readResponse().catch((err) => {
  console.log("Error reading response: ", err);
});