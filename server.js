const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
      origin: 'http://localhost:3000',
      method: ['GET', 'POST'],
  },
});

app.use(express.static(__dirname));
console.log(__dirname);

require('./socket/socket')(io);
const { getAllUsers } = require('./controller/messages');

app.set('views', './views');

app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// app.get('/', getAll);
app.get('/user', getAllUsers);
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/views/messagesList.html`);
  // res.sendFile(`${__dirname}/views/messagesList.ejs`);
  // res.render('messagesList');
});

http.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));