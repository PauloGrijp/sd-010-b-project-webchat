require('dotenv').config();
const express = require('express');

const app = express();
const cors = require('cors');
const http = require('http').createServer(app);
const path = require('path');
const socketIo = require('socket.io');
const chatServer = require('./socket/chatServer');

const { PORT = 3000 } = process.env;

const io = socketIo(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

const chatController = require('./controllers/chatController');

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.get('/', chatController.appChat);

chatServer(io);

http.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});