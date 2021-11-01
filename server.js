require('dotenv').config();

const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');
const cors = require('cors');
const moment = require('moment');

const pathViews = path.join(__dirname, 'src/views');
const port = process.env.PORT || 3000;
const messages = [];

app.set('view engine', 'ejs');
app.set('views', pathViews);
app.use(
  cors({
    origin: `http://localhost${port}`,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Authorization'],
  }),
);
app.get('/', (req, res) => {
  res.render('board', { messages });
});

io.on('connection', (socket) => {
  console.log(`Usuário conectado, ID: ${socket.id}`);

  socket.on('message', ({ chatMessage, nickname }) => {
    const timeMsg = moment().local(true).format('DD-MM-yyyy hh:mm:ss A');
    const userMessage = `${timeMsg} - ${nickname}: ${chatMessage}`;

    messages.push(userMessage);

    io.emit('message', { userMessage, nickname });
  });

  socket.on('disconnect', () => {});
});

http.listen(port, () => {
  console.log(`Server rodando na porta ${port}`);
});
