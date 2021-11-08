require('dotenv').config();
const express = require('express');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const { PORT } = process.env;

app.use('/', (_req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

require('./sockets/chat')(io);

app.use(express.static(`${__dirname}/public`));

server.listen(PORT, () => console.log('listening na port', PORT));
