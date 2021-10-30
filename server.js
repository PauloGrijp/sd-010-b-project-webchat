require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const PORT = process.env.PORT || 3000;

const app = express();
const socketIoServer = require('http').createServer(app);

const io = require('socket.io')(socketIoServer, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

socketIoServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
 });

const { getDate } = require('./utils/getDate');
const { getAllMessages, postMessage } = require('./controllers/messagesController');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(
  cors({
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Authorization'],
  }),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const onlineUsers = {};

io.on('connection', async (socket) => {
  io.emit('setIdNickname');
  socket.on('message', async (data) => {
    const { chatMessage, nickname } = data;
    const timestamp = getDate();
    await postMessage({ chatMessage, nickname, timestamp });
    const completeMessage = `${timestamp} - ${nickname}: ${chatMessage}`;
    io.emit('message', completeMessage);
  });
  socket.on('updateIdNicknameArray', (idNicknameObj) => {
    const objKeys = Object.keys(idNicknameObj)[0];
    const objValues = Object.values(idNicknameObj)[0];
    onlineUsers[objKeys] = objValues;
    io.emit('updateIdNicknameArray', Object.values(onlineUsers));
  });
  socket.on('disconnect', () => {
    delete onlineUsers[socket.id];
    io.emit('updateIdNicknameArray', Object.values(onlineUsers));
  });
});

app.get('/', async (req, res) => { 
  const dataDb = await getAllMessages();
  await res.status(200).render('chat', { dataDb }); 
});
