const express = require('express');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 3000;

const app = express();
const http = require('http').createServer(app);

app.use(cors());
app.set('view engine', 'ejs');
app.set('views', './views');

// essa função foi fornecida pelo meu colega Renato;
  const todayDate = () => {
    const date = new Date();
      const data = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
      const minutes = date.getMinutes();
      const hourAndMinute = `${date.getHours()}:${minutes}:${date.getSeconds()}`; 
      const today = `${data} ${hourAndMinute}`;
      return today;
  };

  function randomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() 
    * charactersLength));
    }
    return result;
  }
  
  const onlineUsers = [];
  const newUser = () => {
    const random = randomString(16);
    onlineUsers.push(random);
    return random;
  };

  // https://stackoverflow.com/questions/8073673/how-can-i-add-new-array-elements-at-the-beginning-of-an-array-in-javascript
  const lastOnTop = (user) => {
    const arrayUsers = onlineUsers.slice(0, -1);
    arrayUsers.unshift(user);
    return arrayUsers;
  };

  const io = require('socket.io')(http, {
    cors: {
      origin: `http://localhost:${3000}`, // url aceita pelo cors
      methods: ['GET', 'POST'], // Métodos aceitos pela url
    } });
    const { messageControl } = require('./controller/messageController');
    const { saveMessages } = require('./models');

    const createUser = async ({ nickname, chatMessage }) => {
      const dateNameMsg = `${todayDate()} ${nickname} ${chatMessage}`;
      await saveMessages(dateNameMsg);
      return dateNameMsg;
    };

     // meus colegas Diegho, Renato e Carlos me ajudaram a função onlineUsers.indexOf(user);
    io.on('connection', (socket) => {
    let user = newUser();
    lastOnTop(user);
    
    socket.on('disconnect', () => {
      onlineUsers.splice(onlineUsers.indexOf(user), 1);
      io.emit('onlineUser', onlineUsers);
    });

    socket.emit('random', user);
    
    socket.emit('onlineUser', lastOnTop(user));
    socket.broadcast.emit('onlineUser', onlineUsers);
    
    socket.on('newNickName', (newNickName) => { 
      onlineUsers.splice(onlineUsers.indexOf(user), 1, newNickName);
      user = newNickName;
      io.emit('onlineUser', lastOnTop(user));
    });

    socket.on('message', async ({ nickname, chatMessage }) => {
      const newUserAndMsg = await createUser({ nickname, chatMessage });
      io.emit('message', newUserAndMsg);
    });
  });

app.get('/', (req, res) => {
  res.render('index.ejs');
});

// Renato, Jonathan e Eder me ajudaram a construir a rota e o retorno do controller.
app.get('/messages', messageControl);

http.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port}`);
});
