const express = require('express');
const cors = require('cors');

const app = express();
const httpServer = require('http').createServer(app);

app.use(express.json());
app.use(cors());

app.use(express.static(`${__dirname}/public`));

const io = require('socket.io')(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

require('./sockets/userLogger')(io);
require('./sockets/message')(io);

app.get('/', (_req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});

httpServer.listen(3000, () => {
  console.log('Open');
});