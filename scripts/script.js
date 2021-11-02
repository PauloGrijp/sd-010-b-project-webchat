const socket = window.io();

const createListItem = (text, ulID, atribute) => {
  /* SOURCE https://developer.mozilla.org/pt-BR/docs/Web/API/Element/setAttribute */
  const li = document.createElement('li');
  li.append(text);
  if (ulID === 'users') li.id = text;
  li.setAttribute('data-testid', `${atribute}`);
  document.getElementById(`${ulID}`).appendChild(li);
};

socket.on('onlineUsers', (user) => {
  createListItem(user, 'users', 'online-user');
});

socket.on('message', (message) => {
  createListItem(message, 'messages', 'message');
});

socket.on('saveNickname', (userNickname) => {
  sessionStorage.setItem('nickname', userNickname);
});

socket.on('updateNickname', ({ previousNickname, atual }) => {
  const previousNicknameUser = document.getElementById(`${previousNickname}`);
  previousNicknameUser.id = atual;
  previousNicknameUser.innerText = atual;
});

socket.on('offLineUser', (user) => {
  const disconnectedUser = document.getElementById(`${user}`);
  const usersList = document.querySelector('#users');
  usersList.removeChild(disconnectedUser);
});

const nicknameBtn = document.querySelector('#nicknameBtn');
const messageBtn = document.querySelector('#messageBtn');
const inputMessage = document.querySelector('#messageInput');
const nicknameInput = document.querySelector('#nicknameInput');

nicknameBtn.addEventListener('click', () => {
  /* Source https://qastack.com.br/programming/6193574/save-javascript-objects-in-sessionstorage */
  const previousNickname = sessionStorage.getItem('nickname');
  sessionStorage.setItem('nickname', nicknameInput.value);
  socket.emit('updateNickname', { previousNickname, atual: nicknameInput.value });
  nicknameInput.value = '';
});

messageBtn.addEventListener('click', () => {
  socket.emit('message', { 
    chatMessage: inputMessage.value, nickname: sessionStorage.getItem('nickname') });
  inputMessage.value = '';
  return false;
});