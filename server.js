const express = require('express');
const cors = require('cors');

const app = express();
const http = require('http').createServer(app);

app.use(cors());
app.set('view engine', 'ejs');
app.set('views', './views');

// essa função foi fornecida pelo meu colega Renato;
const todayDate = () => {
  const date = new Date();
      const data = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
      const minutes = date.getMinutes();
      const hourAndMinute = `${date.getHours()}:${minutes}:${date.getSeconds()}`; 
      const today = `${data} ${hourAndMinute}`;
      return today;
      };

const io = require('socket.io')(http, {
    cors: {
      origin: 'http://localhost:3000', // url aceita pelo cors
      methods: ['GET', 'POST'], // Métodos aceitos pela url
    } });

  io.on('connection', (socket) => {
    console.log(`Usuário conectado. ID: ${socket.id} `);

    socket.on('disconnect', () => console.log('Alguém se desconectou'));

    socket.on('message', ({ nickname, chatMessage }) => {
    const dateNameMsg = `${todayDate()} ${nickname} ${chatMessage}`;
    console
    .log(`Alguém enviou a mensagem: ${dateNameMsg}`);
    });

    socket.on('message', ({ nickname, chatMessage }) => {
      const dateNameMsg = `${todayDate()} ${nickname} ${chatMessage}`;
      io.emit('message', (dateNameMsg));
    });
  });

app.use('/', (req, res) => {
  res.render('index.ejs');
});

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});