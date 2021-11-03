const express = require('express');
require('dotenv').config();

const app = express();
const http = require('http').createServer(app);

const PORT = process.env.PORT || 3000;

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    method: ['GET', 'POST'],
  },
});

const { getAllMessages, createMessage } = require('./src/controllers/chatControler');

let usersConnected = [];

const disconectar = (socketId) => {
  usersConnected = usersConnected.filter((id) => socketId !== id.id);
  return usersConnected; 
};

io.on('connection', (socket) => {
  // usersConnected.push(socket.id);

  socket.on('usersConnected', ({ nickname }) => {
    usersConnected = usersConnected.filter((id) => socket.id !== id.id);
    usersConnected.push({ id: socket.id, nickname });
    io.emit('usersConnected', usersConnected);
  });

  socket.on('disconnect', () => {
    disconectar(socket.id);
    io.emit('usersConnected', usersConnected);
  });

  socket.on('message', async (message) => {
    const { chatMessage, nickname } = message;
    const timestamp = new Date().toLocaleString().replace(/\//g, '-');
    console.log(timestamp);
    await createMessage(timestamp, nickname, chatMessage);
    
    io.emit('message', `${timestamp} - ${nickname} ${chatMessage}`);
  });
});

app.get('/messages', getAllMessages);

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

http.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});