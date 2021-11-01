require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT || 3000;

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`, // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  },
});

const controller = require('./src/controllers/chat');

app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

require('./sockets/chat')(io);

app.get('/', controller.getAllMessages);
app.post('/', (req, res) => {});

http.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});