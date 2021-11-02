const date = require('../useful/date');
const { addingMessage } = require('../models/messageModel');
const { getAll } = require('../models/messageModel');

const currentDate = date();
const onlineUsers = [];

  const removeOnlineUsers = (socketId) => {
      const userInfo = onlineUsers.find((user) => user.socketId === socketId);
      const userInfoIndex = onlineUsers.indexOf(userInfo);
      if (userInfoIndex > -1) {
        onlineUsers.splice(userInfoIndex, 1);
      }
    };
    
  const disconnectFunc = (io, socket) => {
       removeOnlineUsers(socket.id);
       io.emit('onlineUsers', onlineUsers);
       socket.disconnect();
    };

const updateNickname = (socketId, newNickname, io) => {
  const userInfo = onlineUsers.find((user) => user.socketId === socketId);
  const userInfoIndex = onlineUsers.indexOf(userInfo);
  onlineUsers[userInfoIndex] = {
    socketId,
    nickname: newNickname,
  };
  io.emit('onlineUsers', onlineUsers);
};

const getAllMessages = (socket, allMessagesFromBd) => {
   const messages = allMessagesFromBd
    .map((message) => `${currentDate} - ${message.nickname}: ${message.message}`);
  socket.emit('messageList', messages);
  return messages;
};

module.exports = (io) => io.on('connection', async (socket) => {
  socket.on('newUserNickname', (nickname) => {
    onlineUsers.push({ socketId: socket.id, nickname });
    io.emit('onlineUsers', onlineUsers);
    console.log('newUser', onlineUsers);
  });
  
  socket.on('updateNickname', (newNickname) => { updateNickname(socket.id, newNickname, io); });
  
  const allMessagesFromBd = await getAll();
  getAllMessages(socket, allMessagesFromBd);
  
  socket.on('message', async ({ chatMessage, nickname }) => {
    await addingMessage(chatMessage, nickname, currentDate);
    io.emit('message', `${currentDate} - ${nickname}: ${chatMessage}`);
  });

  socket.on('disconnect', () => { disconnectFunc(io, socket); });
});
