const socket = window.io();

const messageForm = document.querySelector('.messageForm');
const inputMessage = document.querySelector('#messageInput');
const nickForm = document.querySelector('.nickForm');
const inputNick = document.querySelector('#nickInput');

const idTest = 'data-testid';

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', { chatMessage: inputMessage.value });
  inputMessage.value = '';
  return false;
});

nickForm.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('nick', inputNick.value);
  inputNick.value = '';
  return false;
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute(idTest, 'message');
  messagesUl.appendChild(li);
};

const createUsuario = (message) => {
  const usuario = document.querySelector('#usuario');
  usuario.innerText = message;
  const usuarioLi = document.querySelector('#nickUsuario');
  usuarioLi.innerText = message;
};

const changeNick = (message) => {
  const messagesUl = document.querySelector('#usuarios');
  const li = document.createElement('li');
  li.setAttribute(idTest, 'online-user');
  li.innerText = message;
  messagesUl.appendChild(li);
};

socket.on('login', (mensagem) => createUsuario(mensagem));
socket.on('newlogin', ({ usuario }) => changeNick(usuario));
socket.on('newNick', (usuario) => changeNick(usuario));
socket.on('message', (message) => createMessage(message));