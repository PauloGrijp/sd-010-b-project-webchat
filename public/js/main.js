const socket = window.io();

const formNick = document.getElementById('form-nick');
const changeNickInput = document.getElementById('nick-input');
const nickList = document.getElementById('nicknameList');
const form = document.getElementById('form');
const input = document.getElementById('input');

let nickname = '';
const DATA_TEST_ID = 'data-testid';

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
      const messageObj = {
        nickname,
        chatMessage: input.value,
      };
      input.value = '';
      socket.emit('message', messageObj);
    }
  });

  formNick.addEventListener('submit', (e) => {
    e.preventDefault();
    if (changeNickInput.value) {      
      const newNickObj = {
        newNick: changeNickInput.value,
        nickname,
      };
      nickname = changeNickInput.value;
      changeNickInput.value = '';
      sessionStorage.setItem('storageNick', nickname);
      socket.emit('changeNickname', newNickObj);
    }
  });

  socket.on('nickname', (data) => {
    nickname = data;
    sessionStorage.setItem('storageNick', nickname);
  });
 
  socket.on('allNicks', (data) => {
    nickList.innerHTML = '';
    const storageNick = sessionStorage.getItem('storageNick');  
    const newData = data.filter((user) => user !== storageNick);
    newData.unshift(storageNick);
    newData.forEach((element) => {    
      const item = document.createElement('li');
      item.textContent = element;
      item.setAttribute(DATA_TEST_ID, 'online-user');
      nickList.appendChild(item);
    });
  });
  
  socket.on('message', (data) => {
    const div = document.createElement('div');
    div.textContent = data;
    div.setAttribute('data-testid', 'message');
    document.getElementById('message-container').append(div);   
  });

  socket.on('allMessages', (dbMessages) => {
    console.log(dbMessages);
    dbMessages.forEach((msg) => {
    const div = document.createElement('div');
    const message = `${msg.timestamp} - ${msg.nickname}: ${msg.message}`;
    div.innerText = message;
    div.setAttribute(DATA_TEST_ID, 'message');
    document.getElementById('message-container').append(div);  
    });
  });