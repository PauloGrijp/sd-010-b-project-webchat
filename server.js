// Faça seu código aqui

const express = require('express');

const app = express();
const http = require('http');
const cors = require('cors');

const server = http.createServer(app);

app.set('view engine', 'ejs');
app.set('views', './views');

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000', // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  } });

app.use(cors());
app.use(express.json());

const formatMessage = require('./util/formatMessage');
const getTheCurrentDate = require('./util/getTheCurrentDate');

app.get('/', (req, res) => {
  res.status(200).render('client');
});

// const allcustomerMessages = [];
const arrayUsersOn = [];

io.on('connection', (socket) => {
  console.log(`${socket.id} usuario conectado`);
  
  socket.on('disconnect', () => {
    arrayUsersOn.length = null;
    console.log('user  disconnected');
  });

  socket.on('firstLoading', (user) => {
    // persistência de usuário 
    arrayUsersOn.push({ nickname: user, idSocket: socket.id });
    io.emit('firstLoading', arrayUsersOn, socket.id);
  });
    
  socket.on('message', ({ chatMessage, nickname }) => {
    const date = getTheCurrentDate();
    const fullMessage = formatMessage(date, chatMessage, nickname);
    io.emit('message', fullMessage);
    // // persistência de mensagem
    // allcustomerMessages.push({ idSocket: socket.id, nickname, chatMessage });
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});