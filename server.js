const express = require('express');

const app = express();
const http = require('http').createServer(app);
const cors = require('cors');

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

require('./src/sockets')(io);

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use('/', express.static(`${__dirname}/public`));

http.listen(PORT, () => console.log('App listening on PORT %s', PORT));
