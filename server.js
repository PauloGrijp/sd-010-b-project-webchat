const express = require('express');
const app = express();
const http = require('http').Server(app);
const moment = require('moment');

const PORT = process.env.PORT || 3000;

const usersOnline = {};

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST']
  }
});

// função executada quando usuário se conecta
io.on('connection', (socket) => {
  usersOnline[socket.id] = socket.id.slice(0, 16);
  socket.on('message', ({ chatMessage, nickname }) => {
    const dateNow = moment().format('DD-MM-YYYY HH:mm:ss');
    io.emit('message', `${dateNow} - ${nickname}: ${chatMessage}`);
  });

  socket.on('disconnect', () => {
    delete usersOnline[socket.id];
    io.emit('users', Object.values(usersOnline));
  });

  socket.on('newNickName', (nickname) => {
    usersOnline[socket.id] = nickname;
    io.emit('users', Object.values(usersOnline));
  });
});

io.emit('usersOn', Object.values(usersOnline));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

http.listen(PORT, () => {
  console.log(`Rodando fino na porta ${PORT}`);
});
