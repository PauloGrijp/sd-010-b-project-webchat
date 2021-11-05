const socket = window.io();
const messageForm = document.querySelector('#messageForm');

function createMessage(message) {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  messagesUl.appendChild(li);
}

function sendMessage() {
  const chatMessage = document.querySelector('#messageInput').value;
  socket.emit('message', { chatMessage });
}

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  sendMessage();
});

socket.on('message', createMessage);

window.onbeforeunload = (_event) => {
  socket.disconnect();
};