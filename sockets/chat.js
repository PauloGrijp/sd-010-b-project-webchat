const date = require('date-and-time');

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('joinChat', ({ nickname }) => {
    // socket.emit: Emite a msg SOMENTE para o socket que se conectou
    socket.emit('message', 'Olá, seja bem vindo ao nosso chat');

    // socket.broadcast.emit: Emite a msg pata TODOS, MENOS para o socket que se conectou
    socket.broadcast.emit('message', `${nickname} acabou de se conectar`);
  });

  socket.on('message', ({ chatMessage, nickname }) => {
    // console.log(`Mensagem ${message}`);

    // Source: https://www.geeksforgeeks.org/node-js-date-format-api/
    const now = new Date();

    const value = date.format(now, 'DD-MM-YYYY HH:mm:ss');

    // oi.emit: Emite a msg pata TODOS os sockets conectados
    io.emit('message', `${value} - ${nickname}: ${chatMessage}`);
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('message', `${socket.id} se desconectou!`);
  });
});