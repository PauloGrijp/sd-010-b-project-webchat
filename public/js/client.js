const socket = window.io();

const messageForm = document.querySelector('#messageForm');

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const messageBox = document.querySelector('#messageBox');
    socket.emit('userMessage', messageBox.value);
    messageBox.value = '';
    return false;
});

const createMessage = (message) => {
    const messageList = document.querySelector('#messages');
    const messageItem = document.createElement('li');
    messageItem.innerText = message;
    messageList.appendChild(messageItem);
};

socket.on('message', (message) => createMessage(message));
