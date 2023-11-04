const {
  simulateScript,
  decodeResult,
  ReturnType,
} = require("@chainlink/functions-toolkit");

const fs = require("fs");
const path = require("path");

require("@chainlink/env-enc").config();
// require('dotenv').config()

const simulate = async () => {
  const source = fs
    .readFileSync(path.resolve(__dirname, "./source.js"))
    .toString();

  const prompt = "Describe what a blockchain is in 15 words or less";
  const args = [prompt];

  if (!process.env.GPT_API_KEY) {
    throw Error("Please set the GPT_API_KEY environment variable");
  }

  const secrets = {
    apiKey: process.env.GPT_API_KEY,
  };

  const { responseBytesHexstring, errorString, capturedTerminalOutput } =
    await simulateScript({
      source,
      secrets,
      args,
    });

  if (errorString) {
    console.log("Error :", errorString);
  }
  if (responseBytesHexstring) {
    console.log(
      "Response Bytes decoded to : ",
      decodeResult(responseBytesHexstring, ReturnType.string)
    );
  }
  if (capturedTerminalOutput) {
    console.log("Simulation Logs decoded to : ", capturedTerminalOutput);
  }
};

simulate().catch(err => {
  console.log("\nError running source simulator: ", err);
});
