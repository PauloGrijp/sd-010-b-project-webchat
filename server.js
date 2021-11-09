require('dotenv').config();
const express = require('express');
const path = require('path');

const cors = require('cors');

const PORT = process.env.PORT || 3000;

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});
const controllerChat = require('./src/controllers/webChat');

app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
require('./sockets/chatBack')(io);

app.get('/', controllerChat.getAllMessages);

http.listen(PORT, () => console.log('listening na port', PORT));
