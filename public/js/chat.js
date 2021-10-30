const socket = window.io('http://localhost:3000');
const ID = '#user-name';
let userLocal = '';

const formMessage = document.querySelector('.form-message');
formMessage.addEventListener('submit', (event) => {
  event.preventDefault();
  const { target } = event;
  const newMessage = target.querySelector('#message-box').value;
  const userName = document.querySelector(ID).innerText;
  
  socket.emit('message', { chatMessage: newMessage, nickname: userName });

  target.querySelector('#message-box').value = '';
});

const formUser = document.querySelector('.form-user');
formUser.addEventListener('submit', (event) => {
  event.preventDefault();
  const { target } = event;
  const newNick = target.querySelector('#nickname-box').value;

  userLocal = newNick;
  socket.emit('renameUser', newNick);
  sessionStorage.setItem('userSeted', newNick);
  document.querySelector(ID).innerHTML = newNick;
  target.querySelector('#nickname-box').value = '';
});

// sockets events
socket.on('message', (message) => {
  const containerMessages = document.querySelector('.container-messages');
  const p = document.createElement('p');
  p.setAttribute('data-testid', 'message');
  p.innerText = message;

  containerMessages.appendChild(p);
});

socket.on('setName', (user) => {
  const userSeted = sessionStorage.getItem('userSeted');

  if (!userSeted) {
    userLocal = user;
    document.querySelector(ID).innerHTML = user;
  } else {
    userLocal = userSeted;
    socket.emit('renameUser', userSeted);
    document.querySelector(ID).innerHTML = userSeted;
  }
});

socket.on('usersOnline', (usersOnline) => {
  const othersUsers = document.querySelector('.others-users');
  
  const users = usersOnline
    .filter((user) => user !== userLocal)
    .map((user) => `<h3 data-testid="online-user">${user}</h3>`);

  othersUsers.innerHTML = users.join('');
  console.log(usersOnline);
});

// socket.on('usersOnline', (usersOnline) => {
//   const othersUsers = document.querySelector('.others-users');
//    othersUsers.innerHTML = '';

//   usersOnline
//     .filter((user) => user !== userLocal)
//     .forEach((user) => {
//       const h3 = document.createElement('h3');
//       h3.setAttribute('data-testid', 'online-user');
//       h3.innerText = user;
//       othersUsers.appendChild(h3);
//     });
// });