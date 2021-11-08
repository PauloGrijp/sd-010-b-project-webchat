require('dotenv').config();

const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
      origin: ['http://localhost:3000', 'http://admin.socket.io/'],
      methods: ['GET', 'POST'],
  },
});
const path = require('path');
const cors = require('cors');
const moment = require('moment');

const pathViews = path.join(__dirname, 'src/views');
const port = process.env.PORT || 3000;
const onlineUsers = [];
const messages = [];

app.set('view engine', 'ejs');
app.set('views', pathViews);
app.use(
  cors({
    origin: `http://localhost${port}`,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }),
);
app.get('/', (req, res) => {
  res.render('board', { messages, onlineUsers });
});

io.on('connection', (socket) => {
  // console.log(`Usuário conectado, ID: ${socket.id}`);

  socket.emit('online', onlineUsers);

  onlineUsers.push(socket.id);

  // requisito 4

  // Precisa pegar o nickname que foi gerado lá no front end

  socket.on('message', ({ chatMessage, nickname }) => {
    const timeMsg = moment().local(true).format('DD-MM-yyyy HH:mm:ss A');
    const userMessage = `${timeMsg} - ${nickname}: ${chatMessage}`;

    messages.push(userMessage);

    io.emit('message', { userMessage, nickname });
  });

  socket.on('disconnect', () => {});
});

http.listen(port, () => {
  console.log(`Server rodando na porta ${port}`);
});
