const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');

require('dotenv').config();

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: `http://localhost:${port}`,
    methods: ['GET', 'POST'],
  },
});

require('./socket/socket')(io);

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(cors());

app.get('/', async (req, res) => res.render('app.ejs'));

httpServer.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
