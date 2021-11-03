import io from 'socket.io-client';

const socket = io();
let nickname = '';

const nicknameBox = document.getElementById('nickname-box');
const nicknameButton = document.getElementById('nickname-button');
const messageBox = document.getElementById('message-box');
const sendButton = document.getElementById('send-button');
const messagesContainer = document.getElementById('messages__container');
const usersContainer = document.getElementById('users__container');

socket.on('onlineUsers', (users) => {
  const usersCards = document.querySelectorAll('.user');

  for (let index = 0; index < usersCards.length; index += 1) {
    usersContainer.removeChild(usersCards[index]);
  }

  const userNow = users.filter((user) => user.username === nickname);
  const orderedUsers = users.filter((user) => user.username !== nickname);

  orderedUsers.unshift(userNow[0]);

  orderedUsers.forEach((user) => {
    const userCard = document.createElement('div');

    userCard.setAttribute('data-testid', 'online-user');
    userCard.classList.add('user');
    userCard.textContent = `💬 ${user.username}`;
    usersContainer.appendChild(userCard);
  });
});

const renderMessage = (text) => {
  const message = document.createElement('div');

  message.setAttribute('data-testid', 'message');
  message.innerHTML = text;
  messagesContainer.appendChild(message);
};

sendButton.addEventListener('click', () => {
  if (messageBox.value) {
    const message = {
      chatMessage: messageBox.value,
      nickname,
    };

    socket.emit('message', message);
    messageBox.value = '';
    messageBox.focus();
  }
});

messageBox.addEventListener('keypress', ({ keyCode }) => {
  if (keyCode === 13) {
    sendButton.click();
  }
});

socket.on('message', (message) => {
  renderMessage(message);
});

nicknameButton.addEventListener('click', () => {
  nickname = nicknameBox.value;
  socket.emit('setNickname', nickname);
  document.getElementById('nickname__info').innerText = `⭐ ${nickname}`;
});

const generateRandomNickname = () => (
  Math.random().toString(36).substring(2, 15)
  + Math.random().toString(36).substring(2, 15)
).substring(0, 16);

window.onload = () => {
  nickname = generateRandomNickname();

  socket.emit('connectUser', nickname);

  document.getElementById('nickname__info').innerText = `⭐ ${nickname}`;
};