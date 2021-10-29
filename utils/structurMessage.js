const moment = require('moment');
const model = require('../models/messages');

module.exports = async (message, nickname) => {
  const timestamp = moment().format('DD-MM-yyyy LTS');
  await model.create({ timestamp, message, nickname });
  return `${timestamp} ${nickname} ${message}`;
};
