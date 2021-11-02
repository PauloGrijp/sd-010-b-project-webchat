const { dateTimeFormat } = require('../helpers/dateTimeFormat');
const { messageFormat } = require('../helpers/messageFormat');
const messageController = require('../controllers/messageController');

const users = {};

const newConnection = (io, socket, nickname) => {
  users[socket.id] = nickname;
  // socket.nickname = nickname;
  io.emit('generateList', Object.values(users));
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

const changeNickname = (io, socket, oldNickname, nickname) => {
  // const indexNickname = users.findIndex((user) => user === oldNickname);
  users[socket.id] = nickname;
      // socket.nickname = nickname;
      io.emit('generateList', Object.values(users));
  io.emit('message', `${oldNickname} has changed to ${nickname}`);
};

// const leftRoom = (io, socket, nickname) => {
//   const index = users.indexOf(nickname);
//   users = [...users.slice(0, index), ...users.slice(index + 1)];
//   socket.nickname = nickname;
//   // users.splice(users.indexOf(nickname), 1);
//   // io.emit('generateList', users);
//   io.emit('message', `${nickname} acabou de se desconectar! :(`);
// };

module.exports = (io) =>
  io.on('connection', (socket) => {
    socket.emit('start', socket.id.substring(0, 12));
    socket.on('newConnection', (nickname) => newConnection(io, socket, nickname));
    socket.on('message', ({ chatMessage, nickname }) =>
      message(io, chatMessage, nickname));
    socket.on('changeNickname', ({ oldNickname, nickname }) =>
      changeNickname(io, socket, oldNickname, nickname));
    // socket.on('leftRoom', (nickname) => {
    //   socket.nickname = nickname;
    // });
    socket.on('disconnect', () => {
      // const index = users.indexOf(socket.nickname);
      // users = [...users.slice(0, index), ...users.slice(index + 1)];
      const disconnectedUser = users[socket.id];
      delete users[socket.id];
      io.emit('message', `${disconnectedUser} acabou de se desconectar! :(`);
      io.emit('generateList', Object.values(users));
      console.log(`${socket.id} ${disconnectedUser} se desconectou...`);
    });
  });
