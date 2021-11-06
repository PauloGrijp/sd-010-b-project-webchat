const socket = window.io();

const messageForm = document.querySelector('#messageForm');
const nickForm = document.querySelector('#nickForm');
const customAttr = 'data-testid';
const messageBox = document.querySelector('#messageBox');
const nickNameLabel = document.querySelector('#nickname');
const messageList = document.querySelector('#messages');
const userList = document.querySelector('#users-online');

function createID(length) {
    // credits by https://www.ti-enxame.com/pt/javascript/gere-stringcaracteres-aleatorios-em-javascript/967048592/
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i += 1) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

const createUserName = () => {
    // const oldUserName = localStorage.getItem('userName');
    // if (oldUserName) {
    //     nickNameLabel.innerText = oldUserName;
    //     socket.emit('setUser', oldUserName);
    //     return oldUserName;
    // }
    const newUserName = createID(16);
    socket.emit('setUser', newUserName);
    // localStorage.setItem('userName', newUserName);
    nickNameLabel.innerText = newUserName;
    return newUserName;
};

const changeUserName = (userName) => {
    console.log(userName);
    if (!userName) return;
    // const oldUserName = localStorage.getItem('userName');
    // localStorage.setItem('userName', userName);
    const oldUserName = nickNameLabel.innerText;
    socket.emit('changeUser', { oldUserName, userName });
    nickNameLabel.innerText = userName;
    return userName;
};

messageBox.focus();

nickForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nicknameBox = document.querySelector('#change-nick-text');
    changeUserName(nicknameBox.value);
    nicknameBox.value = '';
    return false;
});

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nickname = nickNameLabel.innerText;
    const chatMessage = messageBox.value;
    socket.emit('message', { chatMessage, nickname });
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

socket.on('setUser', () => {
    createUserName();
});
socket.on('message', (message) => createMessage(message));
socket.on('messages', (messages) => {
    removeMessages();
    messages.forEach((message) => createMessage(message.message));
});
socket.on('users', (users) => {
    removeUsers();
    users.forEach((user) => createUser(user.userName));
});
