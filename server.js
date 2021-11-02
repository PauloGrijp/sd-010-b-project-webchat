const express = require('express');
const http = require('http');
const path = require('path');
require('dotenv').config();

const app = express();

const httpServer = http.createServer(app);

const io = require('socket.io')(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    // endereco onde está rodando no front
    method: ['GET', 'POST'],
  },
});

const webChatRouter = require('./routes/webChatRouter');
const webChatIO = require('./socket/webChatSocket');

webChatIO(io);

app.use(webChatRouter);
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
// setando o express para utilizar o EJS

app.set('views', path.join(__dirname, 'public/views'));

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => console.log(`Ouvindo a porta ${PORT}`));
