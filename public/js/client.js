const socket = window.io();

const messageForm = document.querySelector('#messageForm');
const nickForm = document.querySelector('#nickForm');
const customAttr = 'data-testid';
const messageBox = document.querySelector('#messageBox');

function createID(length) {
    // credits by https://www.ti-enxame.com/pt/javascript/gere-stringcaracteres-aleatorios-em-javascript/967048592/
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i += 1) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

const setUserName = (userName) => {
    const oldUserName = localStorage.getItem('userName');
    let newUserName = !userName ? createID(16) : userName;
    if (oldUserName && !userName) {
        newUserName = oldUserName;
    }
    localStorage.setItem('userName', newUserName);
    if (userName) {
        socket.emit('setup', { oldUserName, newUserName });
    }
    const nickNameLabel = document.querySelector('#nickname');
    nickNameLabel.innerText = `${newUserName}`;
    return newUserName;
};

setUserName();
messageBox.focus();

nickForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nicknameBox = document.querySelector('#change-nick-text');
    setUserName(nicknameBox.value);
    nicknameBox.value = '';
    return false;
});

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nickname = localStorage.getItem('userName');
    const chatMessage = messageBox.value;
    socket.emit('message', { chatMessage, nickname });
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

socket.on('message', (message) => createMessage(message.chatMessage));
socket.on('messages', (messages) => messages.forEach((message) => createMessage(message)));
