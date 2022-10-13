/* eslint-disable comma-dangle */
/* eslint-disable linebreak-style */
const { v1: Uuidv1 } = require('uuid');
const JWT = require('../utils/jwtDecoder');
const SFClient = require('../utils/sfmc-client');
const logger = require('../utils/logger');

/**
 * The Journey Builder calls this method for each contact processed by the journey.
 * @param req
 * @param res
 * @returns {Promise<void>}
 */

exports.execute = async (req, res) => {
  
  // decode data
  const data = JWT(req.body);

 // log data
  logger.info(data);

  try {
    const id = Uuidv1(); //create a job Id value

  //make a POST request through the SFClient to insert data into the data extension
   //the data extension column names are defined in the data extension itself
   //the data is passed in through the inArguments parameter
   //the inArguments parameter is defined in the Journey Builder
   //https://developer.salesforce.com/docs/marketing/marketing-cloud/guide/postDataExtensionRowsetByKey.html
    await SFClient.saveData(process.env.DATA_EXTENSION_EXTERNAL_KEY, [ 
      {
        keys: {
          Id: id,
          SubscriberKey: data.inArguments[0].contactKey,
        },
        values: {
          Event: data.inArguments[0].DropdownOptions,
          StartTime: data.inArguments[0].BlackoutStartTime,
          EndTime: data.inArguments[0].BlackoutFinishTime
        },
      },
    ])

  } catch (error) {
    logger.error(error);
  }
 //send a ok response to SF to clear the contact through the journey
  res.status(200).send({
    status: 'ok',
  });
};

/**
 * Endpoint that receives a notification when a user saves the journey.
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.save = async (req, res) => {
  res.status(200).send({
    status: 'ok',
  });
};

/**
 *  Endpoint that receives a notification when a user publishes the journey.
 * @param req
 * @param res
 */

exports.publish = (req, res) => {
  res.status(200).send({
    status: 'ok',
  });
};

/**
 * Endpoint that receives a notification when a user performs
 * some validation as part of the publishing process.
 * @param req
 * @param res
 */

exports.validate = (req, res) => {
  res.status(200).send({
    status: 'ok',
  });
};
