// Faça seu código aqui
require('dotenv').config();
const express = require('express');

const app = express();
// const cors = require('cors');
const bodyParser = require('body-parser');
// const path = require('path');

app.use(bodyParser.json());

const http = require('http').createServer(app);

const { PORT } = process.env;

let message = '';
const users = [];

/* // Função de hora atual ajuda do Renato Graça
const horaCerta = () => {
    const date = new Date();
    const data = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    const hourAndMinute = `${date.getHours()}:${date.getMinutes()}`; 
    return `${data} ${hourAndMinute}`;
};  */

const io = require('socket.io')(http, {
    cors: {
        origin: `http://localhost:${PORT}`,
        methods: ['GET', 'POST'],
    },
});
const { saveNewMessage } = require('./models/message_model');
const { getMessages } = require('./controller/message_controller');
const horaCerta = require('./helpers/horaCerta');
const geraStringAleatoria = require('./helpers/randomNickname');

app.set('view engine', 'ejs');
app.set('views', './views');

/* app.use(
    cors({
        origin: `http://localhost:${PORT}`,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Authorization'],
    }),
); */

/* ------------------------------------ */

let nickName = ''; 

// função que pega o usuario que tem o id selecionado e atualiza o nickname dele no array
const addUsersOnline = (nickname, socket) => {
    const getId = users.findIndex((user) => user.id === socket.id);
    users[getId].nickname = nickname;
    return users;
};

// Ajuda da colega Letícia Galvão
const usersOnline = (IO, socket, nickname) => {
    // ele envia para todos os usuários e o front escuta essa ação para criar os os Li com as pessoas online
    io.emit('olineUsers', { nickname, id: socket.id });

    // se o users for maior que um ele envia para o dono do socket e o nick dele vai para tela
    if (users.length > 0) {
        users.forEach((user) => {
            socket.emit('olineUsers', user); 
        });
    }
    // atualiza o array adicionando o usuário no users
    users.push({ id: socket.id, nickname });
};

io.on('connection', (socket) => {
    nickName = geraStringAleatoria(16);
    console.log(`Usuário conectado. ID: ${socket.id} `);
    usersOnline(io, socket, nickName);
    socket.on('updateNickname', (nickname) => {
        addUsersOnline(nickname, socket);
        io.emit('updateNickname', { nickname, id: socket.id });
        console.log(users);
    });
    socket.on('message', (data) => {
        message = ` ${horaCerta()} - ${data.nickname}: ${data.chatMessage}`;
        saveNewMessage(data.chatMessage, data.nickname);
        io.emit('message', message);
    }); 
    socket.on('disconnect', () => {
        users.splice({ id: socket.id }, 1);
        io.emit('offUsers', socket.id);
    });
});

app.get('/', async (req, res) => {
        res.render('index', { nickName, users, messages: await getMessages() });
});

 /* app.get('/', getMessages); */

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});