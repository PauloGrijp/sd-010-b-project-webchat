module.exports = (io) => {
    const getDateTime = () => {
        const now = new Date();
        const AMPM = now.getHours() >= 12 ? 'PM' : 'AM'; 
        let fullDateTime = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()} `;
        fullDateTime += `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} ${AMPM}`;
        return fullDateTime;
    };

    io.on('connection', (socket) => {
        socket.broadcast.emit(`User ${socket.id} had just connected`);
        socket.on('userMessage', (message) => {
            const dateTime = getDateTime();
            const messageRecord = `${dateTime} - ${socket.id}: ${message}`;
            io.emit('message', messageRecord);
        });
    });
};
