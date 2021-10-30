const { dateTimeFormat } = require('../helpers/dateTimeFormat');
const { messageFormat } = require('../helpers/messageFormat');

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

      io.emit('message',
        messageFormat({
          chatMessage,
          date: dateTimeFormat(new Date()),
          nickname,
        }));
    });
    socket.on('changeNickname', ({ oldNickname, nickname }) => {
      // console.log(`Mensagem ${message}`);
      users.forEach((user, index) => {
        if (user === oldNickname) {
          users[index] = nickname;
          return;
        }
      });
      io.emit('generateList', users);
      io.emit('nicknameChanged', `${oldNickname} has changed to ${nickname}`);
    });
  });
