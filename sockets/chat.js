const { putMessage } = require('../models/messageModels');

// Renato - https://github.com/tryber/sd-010-b-project-webchat/pull/66/files
const data = () => {
  const date = new Date();
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
};

const hora = () => {
  const date = new Date();
  let minutos = date.getMinutes();

  if (minutos < 10) { minutos = `0${minutos}`; }
  return `${date.getHours()}:${minutos}:${date.getSeconds()}`; 
};

 // Lara  - https://github.com/tryber/sd-010-b-project-webchat/pull/70/files
const randomString = (length) => {
    let nickname = '';
    do {
      nickname += Math.random().toString(36).substr(2);
    } while (nickname.length < length);
    nickname = nickname.substr(0, length);
    return nickname;
};

const onlineList = [];

const dbString = (nickname, chatMessage) => {
  const messages = `${data()} ${hora()} - ${nickname}: ${chatMessage}`;
  putMessage(messages);
  return [messages];
};

module.exports = (io) => io.on('connection', async (socket) => {
  let newNickname = randomString(16);
  socket.emit('conectedAs', newNickname);
  onlineList.push(newNickname);
  io.emit('loginList', onlineList);
  // socket.emit('message', dbmessages());

  socket.on('nick', (nick) => {
    onlineList.splice(onlineList.indexOf(newNickname), 1, nick);
    newNickname = nick;
    socket.emit('conectedAs', newNickname);
    io.emit('loginList', onlineList);
  });

  socket.on('disconnect', () => {
    onlineList.splice(onlineList.indexOf(newNickname), 1);
    io.emit('loginList', onlineList);
  });

  socket.on('message', ({ nickname = newNickname, chatMessage }) => {
    io.emit('message', dbString(nickname, chatMessage));
  });
});
