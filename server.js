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


const usuarios = [];


io.on('connection', (socket) => {
  console.log(`Usuário conectado ${socket.id}`);


  socket.on('message', ({ nickname, chatMessage }) => {
    io.emit('message', create(nickname, chatMessage));
  });

  socket.on('online', (user) => {
    usuarios.unshift({ id: socket.id, nickname: user });
    io.emit('usuarios', usuarios);
  });

  socket.on('mudarNome', (newNickname) => {
    const index = usuarios.findIndex((element) => element.id === socket.id);
    if (index !== -1) usuarios.splice(index, 1);
    usuarios.unshift({ id: socket.id, nickname: newNickname });
    io.emit('usuarios', usuarios);

  });

  socket.on('disconnect', () => {
    const index = usuarios.findIndex((element) => element.id === socket.id);
    if (index !== -1) usuarios.splice(index, 1);
    io.emit('usuarios', usuarios);
  });
});


http.listen(PORT, () => {
  console.log('Rodando na porta %s', PORT);
});