let users = [];

module.exports = (io) => {
  io.on('connection', (socket) => {
    let randomNickName;
    socket.on('nickname', (nick) => {       
      users.push(nick);
      randomNickName = nick;
      io.emit('nickname', users);
    });

    socket.on('changeNickname', (newNickname) => {
      const indexUser = users.findIndex((user) => user === newNickname.randomNickName);
      users[indexUser] = newNickname.newNick;
      randomNickName = newNickname.newNick;
      io.emit('nickname', users);
    });
    
    socket.on('disconnect', () => {
      users = users.filter((user) => user !== randomNickName);
      io.emit('nickname', users);
    });
  });
};