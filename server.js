// Faça seu código aqui

const express = require('express');

const app = express();
const PORT = 3000;
// const http = require('http');
// const cors = require('cors');

// const server = http.createServer(app);

app.set('view engine', 'ejs');
app.set('views', './views');

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

const socketServer = require('socket.io');

const io = socketServer(server);

app.use(express.json());
app.use(express.static(`${__dirname}/views`));

const formatMessage = require('./views/js/util/formatMessage');
const getTheCurrentDate = require('./views/js/util/getTheCurrentDate');

let activeUsers = [];
// const historyMessage = [];

io.on('connection', (socket) => {
  console.log(`${socket.id} usuario conectado`);
  socket.on('new user', (data) => {
    activeUsers.unshift({ data, id: socket.id });
    io.emit('new user', activeUsers);
  });

  socket.on('edit user', ({ newNickName, oldNickName }) => {
    if (activeUsers.findIndex((obj) => obj.data === oldNickName) !== -1) { 
      activeUsers[activeUsers.findIndex((obj) => obj.data === oldNickName)] = { data: newNickName, id: socket.id };
      io.emit('edit user', activeUsers);
    }
  });

  socket.on('message', ({ chatMessage, nickname }) => {
    const messageReturn = formatMessage(getTheCurrentDate(), chatMessage, nickname);
    io.emit('message', messageReturn);
  });

  socket.on('disconnect', () => {
    const newArray = activeUsers.find((user) => user.id === socket.id);
    const newActiveUsers = activeUsers.filter((e) => e.id !== socket.id);
    activeUsers = newActiveUsers;
    io.emit('user disconnected', newArray);
  });
});

app.get('/', (req, res) => {
  res.status(200).render('client', { users: activeUsers });
});

// server.listen(3000, () => {
//   console.log('listening on *:3000');
// });