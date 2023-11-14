// Loads environment variables from .env.enc file (if it exists)
const {
  ResponseListener,
  decodeResult,
  ReturnType,
} = require("@chainlink/functions-toolkit");

require("@chainlink/env-enc").config("../.env.enc");

const { networks } = require("./networks.js");
const { provider } = require("./connection.js");

const NETWORK = "polygonMumbai";

const functionsRouterAddress = networks[NETWORK].functionsRouter;
const subscriptionId = 634; // TODO @dev update this  to show your subscription Id

if (!subscriptionId || isNaN(subscriptionId)) {
  throw Error(
    "Please update the subId variable in scripts/listen.js to your subscription ID."
  );
}

const responseListener = new ResponseListener({
  provider,
  functionsRouterAddress,
});

console.log(
  `\nListening for Functions Responses for subscriptionId ${subscriptionId} on network ${NETWORK}...`
);
// Listen for response
responseListener.listenForResponses(subscriptionId, response => {
  if (!response.errorString) {
    console.log(
      "\nFunctions response decodes to a string value of: ",
      decodeResult(response.responseBytesHexstring, ReturnType.string)
    );
  } else {
    console.log("\nError during the execution: ", response.errorString);
  }
});

// Remove existing listeners
process.on("SIGINT", () => {
  console.log("\nRemoving existing listeners...");
  responseListener.stopListeningForResponses();
});
