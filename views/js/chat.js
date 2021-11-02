window.onload = () => {};
const socket = window.io();

window.onbeforeunload = () => { socket.disconnect(); };

function generateNickName(len) {
  let newNickName = '';
  const charset = 'abcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < len; i += 1) {
    newNickName += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return newNickName;
}

const DATA_TEST_ID = 'data-testid';

const messageInputForm = document.querySelector('#message-input-form');
const inputMessage = document.querySelector('#messageInput');
const inputNickname = document.querySelector('#input-nickname');
const nicknameInputForm = document.querySelector('#nickname-input-form');
// const elementNickname = document.querySelector('.randomNickname');
const randomCaracteres = generateNickName(16);
  
  function setNickname() {
    const newNickName = randomCaracteres;
    sessionStorage.setItem('nickname', newNickName);
    // inputNickname.value = newNickName; // input nickname); 
  }

  nicknameInputForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sessionStorage.setItem('nickname', inputNickname.value);
    socket.emit('updateNickname', inputNickname.value);
    inputNickname.value = '';
    return false;
  });

messageInputForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const nickname = sessionStorage.getItem('nickname');  
  socket.emit('message', { chatMessage: inputMessage.value, nickname });
  // socket.emit('updateNickname', inputNickname.value);
  inputMessage.value = '';
  return false;
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('.messages');
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerText = message;
  messagesUl.appendChild(li);
};

socket.on('message', (message) => createMessage(message));
  socket.on('messageList', (messageList) => {
    messageList.map((message) => createMessage(message));
  });

  const renderOnlineUsers = (onlineUsers) => {
    console.log(onlineUsers);
    const onlineUsersUl = document.getElementById('online-users-list');
    onlineUsersUl.innerHTML = '';
    const thisUserNickName = sessionStorage.getItem('nickname');
    console.log(thisUserNickName);
    const thisUserNickNameLi = document.createElement('li');
    thisUserNickNameLi.setAttribute(DATA_TEST_ID, 'online-user');
    thisUserNickNameLi.innerText = thisUserNickName;
    onlineUsersUl.appendChild(thisUserNickNameLi);
    const onlineUsersNickNames = onlineUsers.map((userObj) => userObj.nickname);
    onlineUsersNickNames.forEach((user) => {
      if (user !== thisUserNickName) {
        const userLi = document.createElement('li');
        userLi.setAttribute(DATA_TEST_ID, 'online-user');
        userLi.innerText = user;
        onlineUsersUl.appendChild(userLi);
      }
    });
  };

  socket.on('onlineUsers', (onlineUsers) => {
    console.log('online', onlineUsers);
    renderOnlineUsers(onlineUsers);
});

socket.on('connect', () => {
  setNickname();
  const nickname = sessionStorage.getItem('nickname');
  socket.emit('newUserNickname', nickname);
});