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

// Função de hora atual
const horaCerta = () => {
    const date = new Date();
    const data = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    const hourAndMinute = `${date.getHours()}:${date.getMinutes()}`; 
    return `${data} ${hourAndMinute}`;
    }; 

const io = require('socket.io')(http, {
    cors: {
        origin: `http://localhost:${PORT}`,
        methods: ['GET', 'POST'],
    },
});
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

const addUsersOnline = (nickname, socket) => {
    const getId = users.findIndex((user) => user.id === socket.id);
    users[getId].nickname = nickname;
    return users;
};

// Ajuda da colega Letícia Galvão
const usersOnline = (socket, nickname) => {
    // socket.emit('olineUsers', nickname);
    io.emit('olineUsers', { nickname, id: socket.id });

    if (users.length > 0) {
        users.forEach((user) => {
            socket.emit('olineUsers', user); 
        });
    }
    users.push({ id: socket.id, nickname });
};

io.on('connection', (socket) => {
    nickName = geraStringAleatoria(16);
    console.log(users);
    console.log(`Usuário conectado. ID: ${socket.id} `);
    usersOnline(io, socket, nickName);
    socket.on('updateNickname', (nickname) => {
        addUsersOnline(nickname, socket);
        io.emit('updateNickname', { nickname, id: socket.id });
        console.log(users);
    });
    socket.on('message', (data) => {
        message = ` ${horaCerta()} - ${data.nickname}: ${data.chatMessage}`;
        io.emit('message', message);
    }); 
    socket.on('disconnect', () => {
        users.splice({ id: socket.id }, 1);
        console.log(users);
        io.emit('offUsers', socket.id);
    });
});

app.use('/', (req, res) => {
        res.render('index', { nickName, users });
});

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});