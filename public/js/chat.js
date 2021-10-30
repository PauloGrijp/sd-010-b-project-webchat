const socket = window.io();
window.onbeforeunload = () => { socket.disconnect(); };

const form = document.querySelector('form');
const inputMessage = document.querySelector('#messageInput');
const inputNickname = document.querySelector('#nickname');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', { chatMessage: inputMessage.value, nickname: inputNickname.value });
  inputMessage.value = '';
  return false;
});

const createMessage = ({ message }) => {
  console.log(message);
  const messagesUl = document.querySelector('.messages');
  console.log('messageM', message);
  const li = document.createElement('li');
  li.innerText = message;
  messagesUl.appendChild(li);
};

socket.on('message', (message) => createMessage({
  message }));