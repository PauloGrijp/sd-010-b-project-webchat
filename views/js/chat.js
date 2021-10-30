const socket = window.io();
window.onbeforeunload = () => { socket.disconnect(); };

function randomFunction(len) {
  let text = '';
  const charset = 'abcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < len; i += 1) {
    text += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return text;
}

const form = document.querySelector('form');
const inputMessage = document.querySelector('#messageInput');
const inputNickname = document.querySelector('#nickname');
const inputRandomNickname = document.querySelector('.randomNickname');
const randomCaracteres = randomFunction(16);
inputRandomNickname.innerHTML = randomCaracteres;

  if (!inputNickname.length) {
    inputNickname.value = randomFunction(16);
  }

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
  li.setAttribute('data-testid', 'message');
  li.innerText = message;
  messagesUl.appendChild(li);
};

socket.on('message', (message) => createMessage({
  message }));