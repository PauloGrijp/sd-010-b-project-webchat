const socket = window.io();

// const changeNickButton = document.getElementById('nick-button');
const formNick = document.getElementById('form-nick');
const changeNickInput = document.getElementById('nick-input');
const nickList = document.getElementById('nicknameList');
const form = document.getElementById('form');
const input = document.getElementById('input');
let nickname = '';

// window.onload = () => socket.emit('userConected');

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
      socket.emit('changeNickname', newNickObj);
    }
  });

  // socket.on('newUserConected', (data) => {
  //   console.log(data);
  //   initialNickname = data;
  //   const item = document.createElement('li');
  //   item.textContent = data;
  //   item.setAttribute('data-testid', 'online-user');
  //   nickList.appendChild(item);
  // });

  // socket.on('allNicks', (data) => {
  //   initialNickname = data;
  //   const storageNick = sessionStorage.getItem('allNicks');
  //   const connectedUsers = data.filter((user) => user !== storageNick);

  //   connectedUsers.unshift(storageNick);
  //   connectedUsers.forEach((user) => {
  //     const item = document.createElement('li');
  //     item.textContent = user;
  //     item.setAttribute('data-testid', 'online-user');
  //     nickList.appendChild(item);
  //   });   
  // });

  socket.on('allNicks', (data) => {
    console.log(data);
    nickname = data;
    data.forEach((element) => {
      const item = document.createElement('li');
      item.textContent = element;
      item.setAttribute('data-testid', 'online-user');
      nickList.appendChild(item);      
    });
  });

  socket.on('message', (data) => {
    const div = document.createElement('div');
    div.textContent = data;
    div.setAttribute('data-testid', 'message');
    document.getElementById('message-container').append(div);   
  });

// changeNickButton.addEventListener('click', () => {
//   const nick = changeNickInput.value;
// });
