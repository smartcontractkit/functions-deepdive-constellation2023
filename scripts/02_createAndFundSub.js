const { SubscriptionManager } = require("@chainlink/functions-toolkit");
const { utils } = require("ethers");

const { signer } = require("../connection");
const { networks } = require("../networks");

const NETWORK = "polygonMumbai";
const consumerAddress = "0x35c14267Ea142bCf1e784A0CdeF83dEcc73988BF"; // TODO @dev get this from step 01
const LINK_AMOUNT = "3.3";

const functionsRouterAddress = networks[NETWORK].functionsRouter;
const linkTokenAddress = networks[NETWORK].linkToken;

const createAndFundSubscription = async () => {
  const subscriptionManager = new SubscriptionManager({
    signer,
    linkTokenAddress,
    functionsRouterAddress,
  });

  // initialize subscription
  await subscriptionManager.initialize();

  // Create subscription.
  // If you pass in a consumerAddress, that consumer contract will automatically
  // be added to the subscription.
  // If you do not pass in a consumer address, you can add a consumer contract later with subscriptionManager.addConsumer()
  // or using the Functions Web app functions.chain.link
  const subscriptionId = await subscriptionManager.createSubscription();
  console.log(`\nSubscription created with ID: ${subscriptionId}`);

  // Add consumer to subscription -- // TODO remove
  const receipt = await subscriptionManager.addConsumer({
    subscriptionId,
    consumerAddress,
  });
  console.log(
    `Consumer added to subId ${subscriptionId}.  Tx Receipt: ${receipt.transactionHash}`
  );

  // Fund your subscription
  const juelsAmount = utils.parseUnits(LINK_AMOUNT, 18).toString();
  const fundConsumerTx = await subscriptionManager.fundSubscription({
    subscriptionId,
    juelsAmount,
  });
  console.log(
    `\nFunded subscription with ${utils.formatEther(juelsAmount)} LINK...`
  );
};

createAndFundSubscription().catch(err => {
  console.log("Error creating and funding subscription: ", err);
});
