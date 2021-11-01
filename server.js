const express = require('express');

const app = express();
const path = require('path');

const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
});

io.on('connection', (socket) => {
  console.log(socket.id);
});

const { chatController } = require('./controllers/chatController');

require('dotenv').config();

app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(chatController);

http.listen(process.env.PORT, () => console.log(`Servidor rodando na porta ${process.env.PORT}`));