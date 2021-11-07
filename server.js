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
const chatController = require('./controller/chatController');

app.use(cors());
app.set('view engine', 'ejs');
app.set('views', './views');

const arrayUser = [];
const date = (new Date()).toLocaleString().replace(/\//g, '-');

io.on('connection', (socket) => {
  socket.on('message', async ({ chatMessage, nickname }) => {
    await chatController.createMessage(chatMessage, nickname, date);
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
});
io.on('connection', (socket) => {
  socket.on('messageDB', async () => {
    const messageDB = await chatController.getAllMessages();
    io.emit('messageDB', messageDB);
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