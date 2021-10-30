const { Router } = require('express');

const chatController = Router();

chatController.get('/', (_req, res) => {
  res.render('chat');
});

module.exports = {
  chatController,
};