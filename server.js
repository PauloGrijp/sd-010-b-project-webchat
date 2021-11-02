require('dotenv').config();
const express = require('express');

const app = express();
const http = require('http').createServer(app);

const port = process.env.PORT || 3000;

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${port}`,
    methods: ['GET', 'POST'],
  },
});

const { getFullDateNow, getFullTimeNow, randomNickname } = require('./utils');

app.set('view engine', 'ejs');

app.use('/', express.static(`${__dirname}views`));

// https://stackoverflow.com/questions/32674391/io-emit-vs-socket-emit
// socket.emit('message', "this is a test"); ***sending to sender-client only
// socket.broadcast.emit('message', "this is a test"); ***sending to all clients except sender
// socket.broadcast.to('game').emit('message', 'nice game'); ***sending to all clients in 'game' room(channel) except sender
// socket.to('game').emit('message', 'enjoy the game'); ***sending to sender client, only if they are in 'game' room(channel)
// socket.broadcast.to(socketid).emit('message', 'for your eyes only'); ***sending to individual socketid
// io.emit('message', "this is a test"); ***sending to all clients, include sender
// io.in('game').emit('message', 'cool game'); ***sending to all clients in 'game' room(channel), include sender
// io.of('myNamespace').emit('message', 'gg'); ***sending to all clients in namespace 'myNamespace', include sender
// socket.emit(); ***send to all connected clients
// socket.broadcast.emit(); ***send to all connected clients except the one that sent the message
// socket.on(); ***event listener, can be called on client to execute on server
// io.sockets.socket(); ***for emiting to specific clients
// io.sockets.emit(); ***send to all connected clients (same as socket.emit)
// io.sockets.on() ; ***initial connection from a client.

const usersList = [];
io.on('connection', (socket) => {
  let userNickname = randomNickname(16);
  socket.emit('userNickname', userNickname);
  
  usersList.push(userNickname);
  
  io.emit('usersList', usersList);

  socket.on('newUserNick', (nickname) => {
  usersList.splice(usersList.indexOf(userNickname), 1, nickname);
  userNickname = nickname;
  // socket.emit('userNickname', userNickname); 
  io.emit('usersList', usersList);
  });

  socket.on('message', ({ chatMessage, nickname }) => {
    const msg = `${getFullDateNow()} ${getFullTimeNow()} - ${nickname}: ${chatMessage}`;
    io.emit('message', msg);
  });

  socket.on('disconnect', () => {
    usersList.splice(usersList.indexOf(userNickname), 1);
    io.emit('usersList', usersList);
  });
});

app.get('/', (req, res) => {
  res.render('index');
});

http.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port}`);
});