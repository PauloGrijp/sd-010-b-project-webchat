const socket = window.io();

const addMessage = (message) => {
  const messagesUl = document.querySelector('#messages-list');
  const li = document.createElement('li');
  li.innerText = message;
  li.dataset.testid = 'message';
  messagesUl.appendChild(li);
};

socket.on('message', (message) => addMessage(message));
