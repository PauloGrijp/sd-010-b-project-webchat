module.exports = (io) => io.on('connection', (socket) => {
  socket.on('joinChat', ({username}) => {
    // socket.emit: Emite a msg SOMENTE para o socket que se conectou
    socket.emit('message', 'Olá, seja bem vindo ao nosso chat');

    // socket.broadcast.emit: Emite a msg pata TODOS, MENOS para o socket que se conectou
    socket.broadcast.emit('message', `${username} acabou de se conectar`);
  });


  socket.on('message', ({ message, username }) => {
    // console.log(`Mensagem ${message}`);

    // oi.emit: Emite a msg pata TODOS os sockets conectados
    io.emit('message', `${username}: ${message}`);
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('message', `${socket.id} se desconectou!`);
  });
});