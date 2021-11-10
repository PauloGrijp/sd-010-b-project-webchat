const express = require('express');

const app = express();
const http = require('http').createServer(app);

require('dotenv').config();

const PORT = process.env.PORT || 3000;

const io = require('socket.io')(http, {
    cors: {
        origin: `http://${process.env.HOSTNAME}:${PORT}`,
        methods: ['GET', 'POST'],
      },
    });

app.use(express.static(`${__dirname}/views`));

require('./sockets/chat')(io);

app.get('/', (req, res) => res.sendFile(`${__dirname}/views/chat.html`));

http.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});