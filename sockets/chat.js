const { dateTimeFormat } = require('../helpers/dateTimeFormat');
const { messageFormat } = require('../helpers/messageFormat');
const messageController = require('../controllers/messageController');

const users = [];

module.exports = (io) =>
  io.on('connection', (socket) => {
    socket.emit('start', socket.id.substring(0, 12));
    socket.on('newConnection', (nickname) => {
      users.push(nickname);
      io.emit('generateList', users);
    });
    socket.on('message', ({ chatMessage, nickname }) => {
      // console.log(`Mensagem ${message}`);
      messageController.create({ message: chatMessage, nickname });

      io.emit('message',
        messageFormat({ chatMessage, date: dateTimeFormat(new Date()), nickname }));
    });
    socket.on('changeNickname', ({ oldNickname, nickname }) => {
      // console.log(`Mensagem ${message}`);
      const indexNickname = users.findIndex((user) => user === oldNickname);
      users[indexNickname] = nickname;
      io.emit('generateList', users);
      io.emit('nicknameChanged', `${oldNickname} has changed to ${nickname}`);
    });
  });
