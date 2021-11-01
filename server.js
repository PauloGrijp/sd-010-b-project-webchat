// Faça seu código aqui
const express = require('express');
const cors = require('cors');
const moment = require('moment');
const ramdomNickname = require('randomstring');

const app = express();
app.use(cors());
app.use(express.static(`${__dirname}/public`));
const server = require('http').createServer(app);

const io = require('socket.io')(server, {  
  cors: {
    origin: 'http://localhost:3000', // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  } });

  const chat = require('./models/chat');

  const users = [];

  io.on('connection', async (socket) => {    
    let randomNick = ramdomNickname.generate(16);
    users.push(randomNick);
    io.emit('allNicks', users);    
    const timestamp = moment().format('DD-MM-yyyy HH:mm:ss A');
    // console.log(`user conected ${socket.id} - nickName ${users}`);

    socket.on('message', async (data) => {
      const completeMessage = `${timestamp} - ${data.nickname}: ${data.chatMessage}`;
      io.emit('message', completeMessage);
      // await chat.saveMessage({ message: data.chatMessage, nickname: data.nickname, timestamp });     
    });
    socket.on('changeNickname', (nickObj) => {
      const indexUser = users.findIndex((nick) => nick === nickObj.nickname);
      users[indexUser] = nickObj.newNick;
      randomNick = nickObj.newNick;
      io.emit('nickname', users);
    });
    socket.on('disconnect', () => {
      io.emit('allNicks', 'A user has left the room');
    });
  });

  app.get('/', (_req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
  });
  
  server.listen(3000, () => {
    console.log('listening on port: 3000');
  });