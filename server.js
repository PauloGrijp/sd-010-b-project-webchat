const express = require('express');
require('dotenv').config();

const { PORT } = process.env || 3000;

const app = express();
app.use(express.static(`${__dirname}/src`));
app.get('/', (_req, res) => {
  res.sendFile(`${__dirname}/src/views/chat.html`);
});

const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: `http//localhost:${PORT}`,
    methods: ['GET', 'POST'], 
  },
});
require('./src/sockets/messages')(io);
require('./src/sockets/users')(io);

app.get('/', (_req, res) => {
  res.sendFile(`${__dirname}/src/views/chat.html`);
});

http.listen(3000, () => {
  console.log('Server on: port 3000');
});
