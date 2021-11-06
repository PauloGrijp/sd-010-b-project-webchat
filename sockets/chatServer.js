const messagesController = require('../controllers/messageController');
const usersController = require('../controllers/userController');

const getDateTime = () => {
    const now = new Date();
    const AMPM = now.getHours() >= 12 ? 'PM' : 'AM'; 
    let fullDateTime = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()} `;
    fullDateTime += `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} ${AMPM}`;
    return fullDateTime;
};

const saveMessage = async (chatMessage, nickname, dateTime) => (
    messagesController.insertMessage(chatMessage, nickname, dateTime));
const getMessages = async () => (messagesController.getMessages());
let chatMessage = 'Server: a new user has just connected';
const manageMessage = async (io, message) => {
    const dateTime = getDateTime();
    chatMessage = `${dateTime} - ${message.nickname}: ${message.chatMessage}`;
    await saveMessage(chatMessage, message.nickname, dateTime);
    io.emit('message', chatMessage);
};

const changeUser = async (socketId, oldUserName, userName) => {
    const users = await usersController.changeUser({ socketId, oldUserName, userName });
    return users;
};

const setUser = async (socketId, userName) => {
    const users = await usersController.getUsers();
    const userExists = users.some((user) => user.userName === userName);
    if (userExists || !userName) return users;
    const insertedUser = await usersController.insertUser(socketId, userName);
    users.push(insertedUser);
    console.log(users);
    return users;
};

const createUser = async (io, socket, userName) => {
    chatMessage = `${userName} has just connected.`;
    const users = await setUser(socket.id, userName);
    io.emit('users', users);
    socket.broadcast.emit('message', chatMessage);
};

const changeUserName = async (io, socket, oldUserName, userName) => {
    chatMessage = `${oldUserName}'s nick has changed. Now it's ${userName}`;
    const users = await changeUser(socket.id, oldUserName, userName);
    io.emit('users', users);
    socket.broadcast.emit('message', chatMessage);
};

const removeUser = async (socket) => {
    const { users, userName } = await usersController.removeUser(socket.id);
    socket.broadcast.emit('message', `User ${userName} has just disconnected!`);
    socket.broadcast.emit('users', users);
};

module.exports = (io) => {
    io.on('connection', async (socket) => {
        console.log('conectei', socket.id);
        io.to(socket.id).emit('setUser');
        const messages = await getMessages();
        io.to(socket.id).emit('messages', messages);
        socket.on('message', async (message) => (manageMessage(io, message)));
        socket.on('setUser', (userName) => (createUser(io, socket, userName)));
        socket.on('changeUser', ({ oldUserName, userName }) => (
            changeUserName(io, socket, oldUserName, userName)));
        socket.on('disconnect', () => (removeUser(socket)));
    });
};
