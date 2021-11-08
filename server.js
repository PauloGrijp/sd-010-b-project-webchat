const app = require('express')();
const http = require('http').createServer(app);
const { instrument } = require('@socket.io/admin-ui');
const cors = require('cors');
require('dotenv').config();


const io = require('socket.io')(http, {
  cors: {
    origin: ['http://localhost:3000', 'https://admin.socket.io/'],
    methods: ['GET', 'POST'],
  },
});


const { create } = require('./mensagem.js');


instrument(io, { auth: false });
const PORT = process.env.PORT || 3000;


app.set('view engine', 'ejs');
app.set('views', './views');
app.use(cors());


app.get('/', (_, res) => {
  res.render('sala');
});


io.on('connection', (socket) => {
  console.log(`Usuário conectado ${socket.id}`);


  socket.on('message', ({ nickname, chatMessage }) => {
    io.emit('message', create(nickname, chatMessage));
  });


  socket.on('disconnect', () => {
    console.log(`${socket.id} saiu`);
  });
});


http.listen(PORT, () => {
  console.log('Rodando na porta %s', PORT);
});