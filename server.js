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

// Iniciando conexão!!
app.use(cors());

const generateString = require('./utils');

// Quando o socket é on ele está aguardando mensagem!
// quando é emit ele está emitindo mensagem mas para quem? neste caso aqui do back para o front!
io.on('connection', (socket) => {
    // Aqui consigo ver quem se conectou!!!
    socket.emit('login', generateString(16));
    socket.on('disconnect', () => {
        console.log('Alguém se desconectou');
    });
    socket.on('message', (ChatMsgAndNickName) => {
      const { chatMessage, nickname } = ChatMsgAndNickName;
      // DD-MM-yyyy HH:mm:ss ${nickname} ${chatMessage}
      // https://momentjs.com/
      const data = moment().format('DD-MM-YYYY h:mm:ss a');
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