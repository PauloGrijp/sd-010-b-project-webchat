require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

const { PORT = 3000 } = process.env;
app.use(
  cors({
    origin: [`http://localhost:${PORT}`], // urls aceitas pelo cors
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // métodos aceitos pelas urls
    allowedHeaders: ['Authorization'],
  }),
);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const httpServer = require('http').createServer(app);

const options = {
  cors: {
    origin: [`http://localhost:${PORT}`], // urls aceitas pelo cors
    methods: ['GET', 'POST'], // métodos aceitos pelas urls
  },
};

const io = require('socket.io')(httpServer, options);

io.on('connection', (socket) => {
  console.log(socket);
  console.log(`Usuário conectado. ID: ${socket.id}`);
});

app.get('/', (req, res) => {
  // res.sendFile(`${__dirname}/index.html`);
  res.render('board');
});

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});