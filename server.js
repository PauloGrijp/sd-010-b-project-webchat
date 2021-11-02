const express = require('express');

const app = express();
const server = require('http').createServer(app);

const port = 3000;
const io = require('socket.io')(server, {
  cors: {
    origin: `http://localhost:${port}`,
    methods: ['GET', 'POST', 'PUT', 'DELET'],
  },
});

const webController = require('./controllers/webControler');
const { createNickname } = require('./utils/util');
const { sendMessage } = require('./utils/io');

const users = [];
app.use(express.json());

app.set('view engine', 'ejs');

app.use(express.static(`${__dirname}/public`));

io.on('connection', async (client) => {
let userName = createNickname(16);
users.push(userName);

  console.log(`client on ID: ${client.id}`);

  client.on('message', (msg) => io.emit('message', sendMessage(msg)));

  client.emit('userName', userName);

  io.emit('usersOn', users);
  client.on('usersOn', (user) => { userName = user; });
  
  client.on('alterName', (newName) => {
    users.splice(users.indexOf(userName), 1, newName);
    io.emit('usersOn', users);
  });

  client.on('disconnect', () => {
    users.splice(users.indexOf(userName), 1);
    io.emit('usersOn', users);
  });
});

const getAll = async () => {
  const message = await webController.getAll();
  return message;
};

app.get('/', async (req, res) => res.render('index', { messages: await getAll() }));
server.listen(port, () => console.log(`Online ${port}`));