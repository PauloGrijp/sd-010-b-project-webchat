const socket = window.io();

const msgContainer = document.querySelector('#msgContainer');
const msgInput = document.querySelector('#msgInput');
const msgBtn = document.querySelector('#msgBtn');
const DATA_TEST_ID = 'data-testid';

let nickname = '';

const addNickUser = ({ nick }) => { nickname = nick; };

msgBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const chatMessage = msgInput.value;
  socket.emit('message', { chatMessage, nickname });
});

const addMessage = (msg) => {
  const msgLi = document.createElement('li');
  msgLi.setAttribute(DATA_TEST_ID, 'message');
  msgLi.innerText = msg;
  msgContainer.appendChild(msgLi);
};

socket.on('connected', ({ nick }) => addNickUser({ nick }));
socket.on('message', addMessage);
