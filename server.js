const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const http = require('http').createServer(app);
require('dotenv/config');

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.set('views', './views');

const PORT = process.env.PORT || 3000;

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000', // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  },
});

app.use(express.static(`${__dirname}/public`));

require('./sockets/chat')(io);

app.get('/', (req, res) => {
  res.render(`${__dirname}/views/chat`);
  // res.status(200).render('chat');
});

http.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});
