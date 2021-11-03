const messagesController = require('../controllers/messageController');

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

module.exports = (io) => {
    io.on('connection', async (socket) => {
        const messages = await getMessages();
        io.to(socket.id).emit('messages', messages);
        socket.on('message', async (message) => {
            const dateTime = getDateTime();
            chatMessage = `${dateTime} - ${message.nickname}: ${message.chatMessage}`;
            await saveMessage(chatMessage, message.nickname, dateTime);
            io.emit('message', chatMessage);
        });
        socket.on('setup', ({ oldUserName, newUserName }) => {
            chatMessage = `${oldUserName}'s nick has changed. Now it's ${newUserName}`;
            socket.broadcast.emit(
                'message',
                chatMessage,
            );
        });
    });
};
