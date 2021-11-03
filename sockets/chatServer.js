const messages = [];
const getDateTime = () => {
    const now = new Date();
    const AMPM = now.getHours() >= 12 ? 'PM' : 'AM'; 
    let fullDateTime = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()} `;
    fullDateTime += `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} ${AMPM}`;
    return fullDateTime;
};

const saveMessage = (message) => (messages.push(message));
const getMessages = () => (messages);
let chatMessage = 'Server: a new user has just connected';

module.exports = (io) => {
    io.on('connection', (socket) => {
        // socket.broadcast.emit('message', chatMessage);
        io.to(socket.id).emit('messages', getMessages());
        socket.on('message', (message) => {
            const dateTime = getDateTime();
            chatMessage = `${dateTime} - ${message.nickname}: ${message.chatMessage}`;
            saveMessage(chatMessage);
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
