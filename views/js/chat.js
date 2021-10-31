const socket = window.io();
window.onbeforeunload = () => { socket.disconnect(); };
function randomFunction(len) {
  let text = '';
  const charset = 'abcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < len; i += 1) {
    text += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return text;
}

const form = document.querySelector('form');
const inputMessage = document.querySelector('#messageInput');
const inputNickname = document.querySelector('#nickname');
const inputRandomNickname = document.querySelector('.randomNickname');
const randomCaracteres = randomFunction(16);
inputRandomNickname.innerHTML = randomCaracteres;

  if (!inputNickname.length) {
    inputNickname.value = inputRandomNickname.innerHTML;
  }

form.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', { chatMessage: inputMessage.value, nickname: inputNickname.value });
  sessionStorage.setItem('nickname', inputNickname.value);
  inputRandomNickname.innerHTML = sessionStorage.getItem('nickname');
  inputMessage.value = '';
  
  return false;
});

const createMessage = ({ message }) => {
  const messagesUl = document.querySelector('.messages');
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerText = message;
  messagesUl.appendChild(li);
};

// socket.on('allMessages', (messages) => {
//   const listMessage = document.querySelector('messages');
//   messages.forEach((msg) => {
//     const item = document.createElement('li');
//     const message = `${msg.timestamp} - ${msg.nickname}: ${msg.message}`;
//     item.textContent = message;
//     item.setAttribute('data-testid', 'message');
//     listMessage.appendChild(item);
//   });
// });

socket.on('nickname', (nickname) => {
  console.log(nickname);
});

socket.on('online', (onlineUser) => {
console.log('onlineA', onlineUser);
});

socket.on('message', (message) => createMessage({
  message }));