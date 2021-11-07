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

const chatController = require('./controller/chatController');

const socket = require('./sockets/sockets');

socket(io);

app.set('view engine', 'ejs');
app.set('views', './views');
app.get('/', chatController.getAll);
http.listen(port, () => {
  console.log('message', port);
});