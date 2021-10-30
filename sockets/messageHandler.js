const { create } = require('../models/Messages');

module.exports = (io, socket) => {
  const formatTimestamp = (timestamp) => timestamp.toLocaleString().replace(/\//g, '-');
  const createMessage = async (payload) => {
    try {
      const { chatMessage, nickname } = payload;
      const { timestamp } = await create({ message: chatMessage, nickname });
      const now = formatTimestamp(timestamp);
      io.emit('message', `${now} - ${nickname} ${chatMessage}`);
    } catch (error) {
      console.error(error);
    }
  };
  socket.on('message', createMessage);
};
