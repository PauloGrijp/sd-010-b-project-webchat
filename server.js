const express = require('express');

const app = express();
const http = require('http').createServer(app);
const cors = require('cors');
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.set('view engine', 'ejs');
app.set('views', './views');

const arrayUser = [];

io.on('connection', (socket) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    const date = (new Date()).toLocaleString().replace(/\//g, '-');
    io.emit('message', `${date} - ${nickname}: ${chatMessage}`);
 });
  socket.on('usersOnline', ({ nickname }) => {
    arrayUser.push({ nickname, id: socket.id });
    io.emit('online', arrayUser);
  });
  socket.on('userUpdate', (nickname, oldNick) => {
    const indexOldNick = arrayUser.findIndex((user) => user.nickname === oldNick);
    arrayUser.splice(indexOldNick, 1, { nickname, id: socket.id });
    io.emit('online', arrayUser);
  });
  socket.on('disconnect', () => {
    const indexUser = arrayUser.findIndex((user) => user.id === socket.id);
    arrayUser.splice(indexUser, 1);
    io.emit('online', arrayUser);
  });
});

app.get('/', (req, res) => {
  res.render('index.ejs');
});
http.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
}); 