require('dotenv').config();

const express = require('express');

const app = express();
const server = require('http').createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000', // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  },
});

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static(`${__dirname}/views`));

require('./sockets/chat')(io);

app.get('/', (_req, res) => {
  // res.sendFile(`${__dirname}/public/chat.html`);
  res.status(200).render('index');
});

const { PORT = 3000 } = process.env;

server.listen(PORT, () => {
  console.log(`server ouvndo na porta ${PORT}`);
});