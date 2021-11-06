const socket = window.io();

let userId = '';

// FONTE: https://www.ti-enxame.com/pt/javascript/gere-stringcaracteres-aleatorios-em-javascript/967048592/
function geraNickName() {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let nickname = '';
  for (let i = 0; i < 16; i += 1) {
    const r = Math.floor(Math.random() * chars.length);
    nickname += chars.substring(r, r + 1);
  }
  return nickname;
}

const nickNameInput = document.getElementById('nickname_input');
const nickNameBtn = document.getElementById('nickname_btn');
const messageInput = document.getElementById('messages_input');
const messageBtn = document.getElementById('messages_btn');

messageBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const nickname = userId || geraNickName();
  socket.emit('message', {
    chatMessage: messageInput.value,
    nickname });
    messageInput.value = '';
  });

const sendMessage = (message) => {
  const messageDiv = document.getElementById('messagesUsers');
  console.log(messageDiv);
  const messageElement = document.createElement('li');
  messageElement.innerText = message;
  messageElement.setAttribute('data-testid', 'message');
  messageDiv.appendChild(messageElement);
};

nickNameBtn.addEventListener('click', (event) => {
  event.preventDefault();
  userId = nickNameInput.value;
  if (userId !== '') {
  socket.emit('newNickname', userId);
  nickNameInput.value = '';
  }
});

const users = (usersOnline) => {
  const usersSection = document.getElementById('usersOn');
  usersSection.innerHTML = '';

  usersOnline.forEach((user) => {
    const userElement = document.createElement('li');
    userElement.innerText = user;
    userElement.setAttribute('data-testid', 'online-user');
    usersSection.appendChild(userElement);
  });
};

socket.on('message', (message) => {
  sendMessage(message);
});

socket.on('users', (usersOnline) => {
  users(usersOnline);
});
