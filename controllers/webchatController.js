const express = require('express');
const { getAll } = require('../models/Messages');

const router = express.Router();

router.route('/').get(async (req, res) => {
  const messages = await getAll();
  res.status(200).render('index', { messages });
});

module.exports = router;
