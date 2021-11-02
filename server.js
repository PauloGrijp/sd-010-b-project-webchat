require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const { PORT } = process.env;

// app.use(express.static(path.join(__dirname, '/src/views')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/views'));

app.use('/', (_req, res) => {
  res.render('index.ejs');
});

io.on('connection', (socket) => {
  socket.on('message', () => console.log(socket.id));
});

server.listen(PORT, () => console.log('listening na port', PORT));
