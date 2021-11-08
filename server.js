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

  // const chat = require('./models/chat');

  let users = [];

  io.on('connection', async (socket) => {    
    let randomNick = ramdomNickname.generate(16); users.push(randomNick);
    socket.emit('nickname', randomNick); io.emit('allNicks', users);
    // io.emit('nickname', randomNick);  
    const timestamp = moment().format('DD-MM-yyyy HH:mm:ss A');   
    socket.on('message', async (data) => {
      const completeMessage = `${timestamp} - ${data.nickname}: ${data.chatMessage}`;
      io.emit('message', completeMessage);
      // await chat.saveMessage({ message: data.chatMessage, nickname: data.nickname, timestamp });     
    });
    socket.on('changeNickname', (nickObj) => {      
      const indexUser = users.findIndex((nick) => nick === nickObj.nickname);
      users[indexUser] = nickObj.newNick;      
      randomNick = nickObj.newNick;
      io.emit('allNicks', users);
      socket.emit('nickname', randomNick);
    });
    socket.on('disconnect', () => {
      users = users.filter((user) => user !== randomNick);       
      io.emit('allNicks', users);
    });
  });

  app.get('/', (_req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
  });
  
  server.listen(3000, () => {
    console.log('listening on port: 3000');
  });