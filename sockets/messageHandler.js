const { create } = require('../models/Messages');

module.exports = (io, socket) => {
  const formatMessage = (message) => {
    const { chatMessage, nickname } = message;
    const now = new Date().toLocaleString().replace(/\//g, '-');
    io.emit('message', `${now} - ${nickname} ${chatMessage}`);
  };
  socket.on('message', formatMessage);
};
