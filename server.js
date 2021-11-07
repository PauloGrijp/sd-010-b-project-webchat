const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

const http = require('http').createServer(app);

const port = 3000;

const io = require('socket.io')(http, {
    cors: {
        origin: 'http://localhost:3000',
        method: ['GET', 'POST'],
    },
});

const chatController = require('./controller/chatController');

const socket = require('./sockets/sockets');

socket(io); // baseado na documentação do socket.io, mas separando em arquivos

app.set('view engine', 'ejs');
app.set('views', './views');
app.get('/', chatController.get);

http.listen(port, () => {
    console.log('message', port);
}); 