const { SubscriptionManager } = require("@chainlink/functions-toolkit");
const { utils } = require("ethers");

const { signer } = require("../connection");
const { networks } = require("../networks");

const NETWORK = "polygonMumbai";

const functionsRouterAddress = networks[NETWORK].functionsRouter;
const linkTokenAddress = networks[NETWORK].linkToken;
const consumerAddress = "0x01568F134A64b8c525E468908a3850B6c6A55F54";
const LINK_AMOUNT = "3.3"

const createAndFundSub = async () => {
  const subscriptionManager = new SubscriptionManager({
    signer,
    linkTokenAddress,
    functionsRouterAddress,
  });

  await subscriptionManager.initialize();

  // Create Subscription
  const subscriptionId = await subscriptionManager.createSubscription();
  console.log(`\n Subscription ${subscriptionId} created.`);

  // add consumer to subscription
  const receipt = await subscriptionManager.addConsumer({
    subscriptionId,
    consumerAddress,
  });

  console.log(
    `\n Subscription ${subscriptionId} now has ${consumerAddress} as a consumer.)`
  );

    // Fund Subscription
    const juelsAmount = utils.parseUnits(LINK_AMOUNT, 18).toString()
    subscriptionManager.fundSubscription({
        subscriptionId,
        juelsAmount
    })

    console.log(`\n Subscription ${subscriptionId} funded with ${LINK_AMOUNT} LINK.`)
};

createAndFundSub().catch(err => {
  console.log("Error creating/funding Subscription ", err);
});
