/* eslint-disable linebreak-style */
const FuelRest = require('fuel-rest'); // https://github.com/salesforce-marketingcloud/FuelSDK-Node-SSJS

//
const options = {
  auth: {
    clientId: process.env.SFMC_CLIENT_ID,
    clientSecret: process.env.SFMC_CLIENT_SECRET,
    authOptions: {
      authVersion: 2,
      accountId: process.env.SFMC_ACCOUNT_ID,
    },
    authUrl: `https://${process.env.SFMC_SUBDOMAIN}.auth.marketingcloudapis.com/v2/token`,
  },
  origin: `https://${process.env.SFMC_SUBDOMAIN}.rest.marketingcloudapis.com/`,
  globalReqOptions: {
  },
};

const client = new FuelRest(options); //Create new REST client

/**
 * Save data in DE
 * @param externalKey
 * @param data
 * @returns {?Promise}
 */

//make a POST request to the /dataevents/key:{externalKey}/rowset endpoint
//to insert row to data extension
//https://developer.salesforce.com/docs/marketing/marketing-cloud/guide/postDataExtensionRowsetByKey.html
const saveData = async (externalKey, data) => client.post({ 
  uri: `/hub/v1/dataevents/key:${externalKey}/rowset`,
  headers: {
    'Content-Type': 'application/json',
  },
  json: true,
  body: data, //array of objects to insert
});

module.exports = { //exporting the client
  client,
  saveData,
};
