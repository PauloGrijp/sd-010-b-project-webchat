const socket = window.io();

const messageForm = document.querySelector('#messageForm');
const customAttr = 'data-testid';

const messageBox = document.querySelector('#messageBox');
messageBox.focus();

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    socket.emit('userMessage', messageBox.value);
    messageBox.value = '';
    return false;
});

const createMessage = (message) => {
    const messageList = document.querySelector('#messages');
    const messageItem = document.createElement('li');
    messageItem.setAttribute(customAttr, 'message');
    messageItem.innerText = message;
    messageList.appendChild(messageItem);
};

socket.on('message', (message) => createMessage(message));
