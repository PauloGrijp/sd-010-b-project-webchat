require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const http = require('http').createServer(app);

const PORT = process.env.PORT || 3000;
const io = require('socket.io')(http, {
  cors: {
    origin: `https://localhost:${PORT}`,
    method: ['GET', 'POST'],
  },
});
require('./sockets/webchat')(io);

const webchatController = require('./controllers/webchatController');

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('public'));
app.use(webchatController);

http.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
