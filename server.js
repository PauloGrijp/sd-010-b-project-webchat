const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 3000;
const app = express();
const http = require('http').createServer(app);

app.use(bodyParser.json());
app.use(cors());

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.get('/', (_req, res) => {
  res.render('webchat.ejs');
});

// Map the public directory | BASED ON https://stackoverflow.com/questions/18629327/adding-css-file-to-ejs
app.use(express.static(`${__dirname}/public`));

const { setMoment } = require('./scripts/date');

io.on('connection', (socket) => {
  console.log(`User connected with socket ID: ${socket.id}`);

  socket.on('message', (message) => {
    io.emit(
      'message',
      `${setMoment()} - <strong>${message.nickname}</strong>: ${message.chatMessage}`,
    );
  });
});

http.listen(PORT, () => console.log(`Running at port ${PORT}!`)); 