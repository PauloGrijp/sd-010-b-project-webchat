const express = require('express');
const app = express();
const http = require('http').Server(app);

const PORT = process.env.PORT || 3000;

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST']
  }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

http.listen(PORT, () => {
  console.log(`Rodando fino na porta ${PORT}`);
});
