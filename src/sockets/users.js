let usersOnline = [];

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('usersOnline', (nickname) => {
    usersOnline.push([nickname, socket.id]);
    io.emit('usersOnline', usersOnline);
  });

  socket.on('changeNickname', (nickname) => {
    usersOnline = usersOnline.map((user) => {
      if (user[1] === socket.id) return [nickname, socket.id];
      return user;
    });
    io.emit('usersOnline', usersOnline);
  });
  
  socket.on('disconnect', () => {
    usersOnline = usersOnline.filter(([_, socketID]) => socketID !== socket.id);
    io.emit('usersOnline', usersOnline);
  });
});
