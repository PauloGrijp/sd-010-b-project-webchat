module.exports = (io) => io.on('connection', async (socket) => {
  console.log(`${socket.id} conectado`);
  socket.on('disconnect', () => {
    console.log('alguém saiu');
  });
}); 