const socket = window.io();

const messageForm = document.querySelector('#messageForm');
const nickForm = document.querySelector('#nickForm');
const customAttr = 'data-testid';
const messageBox = document.querySelector('#messageBox');
const nickNameLabel = document.querySelector('#nickname');
const messageList = document.querySelector('#messages');
const userList = document.querySelector('#users-online');

// function createID(length) {
//     // credits by https://www.ti-enxame.com/pt/javascript/gere-stringcaracteres-aleatorios-em-javascript/967048592/
//     let text = '';
//     const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     for (let i = 0; i < length; i += 1) {
//         text += possible.charAt(Math.floor(Math.random() * possible.length));
//     }
//     return text;
// }

const setNickName = (nickName) => {
    nickNameLabel.innerText = nickName;
};

const changeUserName = (userName) => {
    if (!userName) return;
    const oldUserName = userList.firstChild.innerText;
    socket.emit('changeUser', { oldUserName, userName });
    setNickName(userName);
    return userName;
};

messageBox.focus();

nickForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nickNameBox = document.querySelector('#change-nick-text');
    changeUserName(nickNameBox.value);
    userList.firstChild.innerText = nickNameBox.value;
    nickNameBox.value = '';
    return false;
});

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nickName = nickNameLabel.innerText;
    const chatMessage = messageBox.value;
    console.log(nickName);
    socket.emit('message', { chatMessage, nickName });
    messageBox.value = '';
    return false;
});

const removeMessages = () => {
    while (messageList.hasChildNodes()) {
        messageList.removeChild(messageList.firstChild);
    }
};

const createMessage = (message) => {
    const messageItem = document.createElement('li');
    messageItem.setAttribute(customAttr, 'message');
    messageItem.innerText = message;
    messageList.appendChild(messageItem);
};

const removeUsers = () => {
    while (userList.hasChildNodes()) {
        userList.removeChild(userList.firstChild);
    }
};

const createUser = (user) => {
    const userItem = document.createElement('li');
    userItem.setAttribute(customAttr, 'online-user');
    userItem.innerText = user;
    userList.appendChild(userItem);
};

socket.on('message', (message) => createMessage(message));
socket.on('messages', (messages) => {
    removeMessages();
    messages.forEach((message) => createMessage(message.message));
});
socket.on('users', (users) => {
    removeUsers();
    users.forEach((user) => createUser(user.userName));
});

socket.on('setNickName', (nickName) => (setNickName(nickName)));
