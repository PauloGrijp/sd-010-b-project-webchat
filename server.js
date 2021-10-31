const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');

require('dotenv').config();

const { PORT } = process.env || 3000;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

require('./socket/chat')(io);

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(cors());

app.get('/', (req, res) => res.render('index.ejs'));

httpServer.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
