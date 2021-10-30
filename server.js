const express = require('express');
const path = require('path');
const { chatController } = require('./controllers/chatController');

const app = express();
require('dotenv').config();

app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(chatController);

app.listen(process.env.PORT, () => console.log(`Servidor rodando na porta ${process.env.PORT}`));