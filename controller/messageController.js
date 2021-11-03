const { getAllMessages } = require('../models');

const messageControl = async (req, res) => {
    console.log('messageControl');
    const getMessages = await getAllMessages();
    console.log(getMessages);
    return res.status(200).json(getMessages);
};

module.exports = { messageControl };
