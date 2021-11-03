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

module.exports = (io) => {
    io.on('connection', (socket) => {
        socket.broadcast.emit('message', 'Server: a new user has just connected');
        io.to(socket.id).emit('messages', getMessages());
        socket.on('userMessage', (message) => {
            const dateTime = getDateTime();
            const formattedMessage = `${dateTime} - ${message.nickname}: ${message.chatMessage}`;
            saveMessage(formattedMessage);
            io.emit('message', formattedMessage);
        });
        socket.on('setup', ({ oldUserName, newUserName }) => {
            socket.broadcast.emit(
                'message',
                `User ${oldUserName} has changed his/her nickname. Now it's ${newUserName}`,
            );
        });
    });
};
