const date = require('../useful/date');

const currentDate = date();

module.exports = (io) => io.on('connection', (socket) => {
  // socket.broadcast.emit('serverMessage', `${socket.id} acabou de se conectar :D`);
  // socket.emit('serverMessage', 'Olá, seja bem vindo ao nosso chat público!');
  console.log(`Cliente ID${socket.id} se conectou`);
  socket.on('message', ({ chatMessage, nickname }) => {
    io.emit('message', `${currentDate} - ${nickname}: ${chatMessage}`);

    socket.on('disconnect', () => {
      socket.broadcast.emit('serverMessage', `Xiii! ${socket.id} acabou de se desconectar! :(`);
    });
  });
});