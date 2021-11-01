const date = new Date();
const formatDate = date.toLocaleString().replace(/\//g, '-');
const clients = {};

const nick = Math.random().toString(16).substr(2, 8) + Math.random().toString(16).substr(2, 8);

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.emit('newConnection', { nickname: nick, chatMessage: `${nick} acabou de entrar...` });

    socket.on('send-nickname', (nickname) => {
      clients[socket.id] = nickname;
      socket.emit('welcome', `${formatDate} Sala: Você estrou!`);
      socket.broadcast.emit('welcome', `${formatDate} ${clients[socket.id]} acabou de entrar...`);
    });
    
    socket.on('disconnect', () => {
      socket.broadcast.emit('message', `${formatDate} ${clients[socket.id]} saiu...`);
    });

    socket.on('message', (msg) => {
      const messageToConvey = `${formatDate} ${msg.nickname}: ${msg.chatMessage}`;
      io.emit('message', messageToConvey);
    });
  });
};
