const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const moment = require('moment');
const path = require('path');

moment.locale();

const app = express();

const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET'],
  },
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET'],
  }),
);

io.on('connection', (socket) => {
  const socketId = socket.id.substring(socket.id.length - 16);
  console.log(socketId);
  socket.emit('nickId', socketId);

  socket.on('message', ({ nickname, chatMessage }) => {
    const resp = `${moment()
      .format('DD-MM-YYYY')} ${moment().format('LTS')} - ${nickname}: ${chatMessage}`;
    io.emit('message', resp);
  });
});

app.get('/', (req, res) => {
  res.status(200).render('index.ejs');
});

http.listen(3000, () => console.log('Rodando na porta 3000'));
