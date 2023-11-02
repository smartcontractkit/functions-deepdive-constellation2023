const { SecretsManager,  } = require("@chainlink/functions-toolkit");

const { signer } = require("../connection.js");
const { networks } =  require("../networks.js");


require("@chainlink/env-enc").config();
// require('dotenv').config()


const NETWORK = "polygonMumbai";
const donId = networks[NETWORK].donId;
const functionsRouterAddress = networks[NETWORK].functionsRouter;

const encryptAndUploadSecrets = async () => {
  const secretsManager = new SecretsManager({
    signer,
    functionsRouterAddress,
    donId,
  });

  // initialize secrets manager.
  await secretsManager.initialize();

  // Encrypt secrets & upload them to the DON.
  // Set the TTL to 120 minutes  (enough for the demo!)
  if (!process.env.GPT_API_KEYY) {
    throw new Error(
      "Please set the GPT_API_KEY environment variable"
    );
  }

  const secrets = { apiKey: process.env.GPT_API_KEY };

  
  console.log("\nEncrypting secrets...", secrets)
  const encryptedSecretsObj = await secretsManager.encryptSecrets(secrets);
  
  const gatewayUrls = networks[NETWORK].gatewayUrls;
  const slotId = 0; //  @dev this can be to whatever slotId you want to use/update. For now we use 0.
  const minutesUntilExpiration = 60;

  console.log("\nUploading encrypted secrets to DON...")
  const { version, success } = await secretsManager.uploadEncryptedSecretsToDON(
    {
      slotId,
      minutesUntilExpiration,
      gatewayUrls,
      encryptedSecretsHexstring: encryptedSecretsObj.encryptedSecrets,
    }
  );

  const encryptedSecretsReference = secretsManager.buildDONHostedEncryptedSecretsReference({
    slotId,
    version,
  })

  console.log("\nPlease make a note of this encryptedSecretsReference:  ", encryptedSecretsReference)

};

encryptAndUploadSecrets().catch((err) => {
  console.log("Error encrypting & uploading secrets: ", err);
});
