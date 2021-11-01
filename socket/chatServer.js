const socketIo = require('socket.io');
const generateName = require('nicknames');
const actualDate = new Date().toLocaleString().replace(/\//g, '-');

const users = [];
let actualUser;

const setUserName = (io, socket, nickname) => {
  if (!users.includes(nickname)) {
    users.push({ nickname, id: socket.id });
  }
  io.emit('connected', { users, actualUser: nickname });
};

const setMessage = (io, socket ) => {
  const { message, nickname } = socket;

}
