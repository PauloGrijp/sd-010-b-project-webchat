const express = require('express');

const app = express();
const http = require('http').createServer(app);
const cors = require('cors');
const path = require('path');

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST'],
  },
});
const { convertMessageC } = require('./controllers/chatController');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname} /public`));
app.use(cors());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.get('/', convertMessageC);
require('./sockets/chat')(io);

http.listen(3000, () => {
  console.log('Ouvindo na porta 3000');
});
