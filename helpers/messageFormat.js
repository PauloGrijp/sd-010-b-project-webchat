const messageFormat = ({ chatMessage, date, nickname }) => `${date} - ${nickname}: ${chatMessage}`;

module.exports = { messageFormat };
