const app = require('express')();
const http = require('http').createServer(app);
const cors = require('cors');
const moment = require('moment');
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const port = process.env.PORT || 3000;
const arrayUser = [];
const time = moment().local(true).format('DD-MM-yyyy HH:mm:ss A');
const controller = require('./src/controllers/messageController');

app.use(cors());
app.set('view engine', 'ejs');
app.set('views', './src/views');
app.get('/', (_req, res) => {
  res.render('index.ejs');
});

io.on('connection', (socket) => {
  socket.on('message', async ({ chatMessage, nickname }) => {
    await controller.createMessage(chatMessage, nickname, time);
    io.emit('message', `${time} - ${nickname}: ${chatMessage}`);
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
    const messageDB = await controller.getAllMessages();
    io.emit('messageDB', messageDB);
  });

  socket.on('disconnect', () => {
    const indexUser = arrayUser.findIndex((user) => user.id === socket.id);
    arrayUser.splice(indexUser, 1);
    io.emit('online', arrayUser);
  });
});

http.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
