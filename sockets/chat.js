const { createUserM, deleteUserM, updateNameM } = require('../models/nameModel');
const { createMessageC } = require('../controllers/chatController');

const createUserS = (io, socket) => {
  const nameId = socket.id.slice(0, 16);
  const dbname = nameId;
  socket.emit('nameId', nameId);
  console.log(`${nameId} conectado!`);
  const onlineUsers = createUserM({ nameId, dbname });
  socket.emit('dbname', dbname);
  io.emit('onlineUsers', onlineUsers);
  return nameId;
};
const updateNameS = (io, socket, nameId) => {
  socket.on('newNickname', (nickname) => {
    const onlineUsers = updateNameM({ nameId, dbname: nickname });
    io.emit('onlineUsers', onlineUsers);
  });
};
const responseMessage = (io, socket) => {
  socket.on('message', async (msg) => {
    const { chatMessage, nickname } = msg;
    const createDate = new Date();
    const dateBrazil = createDate.toLocaleDateString().split('/');
    const convertDMY = `${dateBrazil[1]}-${dateBrazil[0]}-${dateBrazil[2]}`;
    const hourMinute = ` ${createDate.getHours()}:${createDate.getMinutes()}`;
    const finalDate = `${convertDMY} ${hourMinute}`;
    await createMessageC({ chatMessage, nickname, finalDate });
    const finalMessage = `${finalDate} - ${nickname}: ${chatMessage}`;
    io.emit('message', finalMessage);
  });
};

module.exports = (io) => {
  io.on('connection', (socket) => {
  const nameId = createUserS(io, socket);
  updateNameS(io, socket, nameId);
  responseMessage(io, socket);
  socket.on('disconnect', () => {
    const onlineUsers = deleteUserM(nameId);
     io.emit('onlineUsers', onlineUsers);
  });
});
};