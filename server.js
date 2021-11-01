require('dotenv').config();
const express = require('express');

const app = express();
const cors = require('cors');
const http = require('http').createServer(app);

const { PORT = 3000 } = process.env;

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

require('./socket/chatServer')(io);

app.use(cors());
app.use('/', express.static(`${__dirname}/public`));

http.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});