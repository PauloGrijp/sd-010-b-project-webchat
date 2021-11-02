const messageModel = require('../models/messageModel');

const getAll = async (_req, res) => {
try {
    const message = await messageModel.getAll();
    return res.json(message);
} catch (error) { 
  return res.status(500).json({ message: error.message });
}
};

module.exports = { getAll };