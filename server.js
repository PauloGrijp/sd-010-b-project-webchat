require('dotenv').config();
const express = require('express');

const app = express();
const http = require('http').createServer(app);
const moment = require('moment');

const PORT = process.env.PORT || 3000;

const usersOnline = {};

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

const { geraNickName } = require('./utils/index');

app.use(express.static('views'));
app.set('view engine', 'ejs');
app.set('views', './views');

// função executada quando usuário se conecta
io.on('connection', (socket) => {
  usersOnline[socket.id] = geraNickName();
  
  socket.on('disconnect', () => {
    delete usersOnline[socket.id];
    io.emit('users', Object.values(usersOnline));
  });

  socket.on('message', ({ chatMessage, nickname }) => {
    const dateNow = moment().format('DD-MM-YYYY HH:mm:ss');
    io.emit('message', `${dateNow} - ${nickname}: ${chatMessage}`);
  });

  socket.on('newNickname', (nickname) => {
    usersOnline[socket.id] = nickname;
    io.emit('users', Object.values(usersOnline));
  });
  io.emit('users', Object.values(usersOnline));
});

app.get('/', (_req, res) => {
  res.render('index');
 });

http.listen(PORT, () => {
  console.log(`Rodando fino na porta ${PORT}`);
});
