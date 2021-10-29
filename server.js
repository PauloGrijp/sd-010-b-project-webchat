// Faça seu código aqui
const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

const http = require('http').createServer(app);

const port = process.env.PORT || 3000;

const io = require('socket.io')(http, {
    cors: {
        origin: 'http://localhost:3000',
        method: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    console.log('Connect', socket.id);
    socket.on('disconnect', () => {
        console.log('Disconnect', socket.id);
    });
    socket.on('message', (message) => {
      console.log(message);
      const { chatMessage, nickname } = message;
      const date = new Date();
      const currenteDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
      const currenteHour = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

      const data = `${currenteDate} ${currenteHour} - ${nickname}: ${chatMessage}`;
      io.emit('message', data);
  });
});

const chatController = require('./controller/chatController');

app.set('view engine', 'ejs');
app.set('views', './views');
app.get('/', chatController.getAll);
http.listen(port, () => {
    console.log('message', port);
});