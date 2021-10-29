require('dotenv').config();
const express = require('express');
// const cors = require('cors');

const app = express();
const http = require('http').createServer(app);

app.set('view engine', 'ejs');
app.set('views', './views');

const PORTA = 3000;

const userList = [];

 const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORTA}`,
    methods: ['GET', 'POST'],
  },
});
// app.use(cors());

const messagesController = require('./controllers/messagesController');

app.get('/', (req, res) => {
  res.render(`${__dirname}/views/chat.ejs`);
});

app.get('/messages', async (req, res) => {
  const messages = await messagesController.getAll();
  res.status(200).json(messages);
});

app.use(express.static(`${__dirname}/views`));

const dateNow = new Date().toLocaleString().replace(/\//g, '-');

io.on('connection', (socket) => {
  socket.on('message', async ({ chatMessage, nickname }) => {
    await messagesController.createMessage(chatMessage, nickname, dateNow);
    // const { chatMessage, nickname } = message;
    io.emit('message', `${dateNow} - ${nickname} ${chatMessage}`);
  });

socket.on('userConnected', (nickname) => {
  userList.push({ nickname, id: socket.id });
  io.emit('updateList', userList);
});

socket.on('nickUpdate', ({ nickname, oldNick }) => {
  const index = userList.findIndex((i) => i.nickname === oldNick);
  userList.splice(index, 1, { nickname, id: socket.id });
  io.emit('updateList', userList);
});

  socket.on('disconnect', ({ id }) => {
  const index = userList.findIndex((user) => user.id === id);
  userList.splice(index, 1);
    io.emit('updateList', userList);
  });
});

// app.use('/languages', LanguageController);
// require('./sockets/votes')(io);

http.listen(PORTA, () => console.log(`Rodando na porta ${PORTA}`));