const express = require('express');
const webChatController = require('../controllers/webChatController.js');

const webChatRouter = express.Router();

webChatRouter.get('/', webChatController.getAllMessages);

module.exports = webChatRouter;
