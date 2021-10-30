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
  
module.exports = (io) => io.on('connection', (socket) => {
  let newNickname = randomString(16);
  socket.emit('login', newNickname);
  socket.broadcast.emit('newlogin', { usuario: newNickname });

  socket.on('nick', (nick) => {
    newNickname = nick;
    io.emit('newNick', nick);
  });

  socket.on('message', ({ nickname = newNickname, chatMessage }) => {
    console.log(`${nickname} - Mensagem ${chatMessage}`, chatMessage);
    io.emit('message', `${data()} ${hora()} - ${nickname}: ${chatMessage}`);
  });
});
