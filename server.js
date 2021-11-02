require('dotenv').config();
const express = require('express');
const cors = require('cors');

const PORT = process.env || 3000;

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`, // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  },
});

app.use(cors());
app.use(express.static(__dirname));

require('./sockets/chat')(io);

app.set('view engine', 'ejs');
app.set('views', './views');

const controller = require('./controllers/messages');

app.get('/', controller.getAllMessages);

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});