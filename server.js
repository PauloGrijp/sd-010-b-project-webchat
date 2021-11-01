const express = require('express');

const app = express();
const http = require('http').createServer(app);
const cors = require('cors');
const moment = require('moment');

// Cors basicamente é nosso servidor!!!
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000', // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  },
});

// Iniciando conexão!!]

const allUsers = [];
app.use(cors());

// Talvez use isso mais tarde, mas consegui resolver a 2 usando apenas o socketid
// const generateString = require('./utils');

// Quando o socket é on ele está aguardando mensagem!
// quando é emit ele está emitindo mensagem mas para quem? neste caso aqui do back para o front!

// https://github.com/socketio/socket.io/issues/3080 
// Adicionar e remover usuario no 
const data = moment().format('DD-MM-YYYY h:mm:ss a');
io.on('connection', (socket) => {
    allUsers.push(socket.id.substr(0, 16));
    socket.emit('login', socket.id.substr(0, 16));
     io.emit('usersOnline', allUsers);
    
    socket.on('disconnect', () => {
      const i = allUsers.indexOf(socket.id.substr(0, 16));
      allUsers.splice(i, 1);
          // removendo usuarios!
          io.emit('usersOnline', allUsers);
    });

    socket.on('newNickname', (nickname) => {
      console.log(nickname, 'estou no back');
      allUsers.splice(allUsers.indexOf(socket.id.substr(0, 16)), 1, nickname);
      io.emit('usersOnline', allUsers);
    });

    socket.on('message', (ChatMsgAndNickName) => {
      const { chatMessage, nickname } = ChatMsgAndNickName;
      // DD-MM-yyyy HH:mm:ss ${nickname} ${chatMessage}
      // https://momentjs.com/
      const sendMensage = `$ ${data} - ${nickname} -  ${chatMessage}`;
      io.emit('message', sendMensage);
    });
});
// Rota get que faz a importação do html
// lembrando que por aqui voce pode receber um login por exemplo através de req.body!! e valida-lo!
app.get('/', (req, res) => res.sendFile(`${__dirname}/index.html`));

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});