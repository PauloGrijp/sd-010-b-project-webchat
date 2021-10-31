const { dateTimeFormat } = require('../helpers/dateTimeFormat');
const { messageFormat } = require('../helpers/messageFormat');
const messageController = require('../controllers/messageController');

const users = [];

const newConnection = (io, nickname) => {
  users.push(nickname);
  io.emit('generateList', users);
};

const message = (io, chatMessage, nickname) => {
  messageController.create({ message: chatMessage, nickname });
  io.emit(
    'message',
    messageFormat({
      chatMessage,
      date: dateTimeFormat(new Date()),
      nickname,
    }),
  );
};

const changeNickname = (io, oldNickname, nickname) => {
  const indexNickname = users.findIndex((user) => user === oldNickname);
  users[indexNickname] = nickname;
  io.emit('generateList', users);
  io.emit('message', `${oldNickname} has changed to ${nickname}`);
};

const leftRoom = (io, nickname) => {
  users.splice(users.indexOf(nickname), 1);
  io.emit('generateList', users);
  io.emit('message', `${nickname} acabou de se desconectar! :(`);
};

module.exports = (io) =>
  io.on('connection', (socket) => {
    socket.emit('start', socket.id.substring(0, 12));
    socket.on('newConnection', (nickname) => newConnection(io, nickname));
    socket.on('message', ({ chatMessage, nickname }) =>
      message(io, chatMessage, nickname));
    socket.on('changeNickname', ({ oldNickname, nickname }) =>
      changeNickname(io, oldNickname, nickname));
    socket.on('leftRoom', (nickname) => leftRoom(io, nickname));
    socket.on('disconnect', () => {});
  });
