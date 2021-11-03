const express = require('express');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});

app.use('/', express.static(`${__dirname}/public`));

require('./sockets/chatServer')(io);

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
 });

app.listen(3000, () => {
    console.log('The server is on and listenning at port 3000');
});
