const guestControler = require('../client/client');
const model = require('../models/messagesModel');
const midlewares = require('../middlewares/middlewares');

const disconect = (socket, io) => {
    socket.on('disconnect', () => {
        io.emit('guests', guestControler.excludeChatty(socket));
    });
};
const addUser = (socket, io) => {
    socket.on('adduser', (random) => {
      io.emit('guests', guestControler.addChatty(random, socket));
    });
};

const addNickname = (socket, io) => {
    socket.on('nickname', (nickname) => {
        io.emit('guests', guestControler.editChatty(nickname, socket));
    });
};

const newMessage = (socket, io) => {
    socket.on('message', async (message) => {
        const dados = midlewares.getDate(message.chatMessage, message.nickname);
        await model.create(message);
        io.emit('message', dados);
    });
};
const chat = (io) => {
io.on('connection', async (socket) => {
    console.log('Connect', socket.id);
    const history = await model.getAll();
    console.log(history);
    io.emit('history', history);
    disconect(socket, io);
    addUser(socket, io);
    addNickname(socket, io);
    newMessage(socket, io);
});
};

module.exports = chat;