const socket = window.io();

const messageForm = document.querySelector('.messageForm');
const inputMessage = document.querySelector('#messageInput');
const nickForm = document.querySelector('.nickForm');
const inputNick = document.querySelector('#nickInput');

const idTest = 'data-testid';

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', { chatMessage: inputMessage.value });
  inputMessage.value = '';
  return false;
});

nickForm.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('nick', inputNick.value);
  inputNick.value = '';
  return false;
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute(idTest, 'message');
  messagesUl.appendChild(li);
};

let thisUser

const createUsuario = (newNickname) => {
  const usuario = document.querySelector('#usuario');
  thisUser = newNickname
  usuario.innerText = thisUser;
};
//   <li id="nickUsuario" data-testid="nickname-box"></li>

const makeUserLi = (paiElement,name) => {

  const li = document.createElement('li');
  li.setAttribute(idTest, 'online-user');
  li.innerText = name;
  paiElement.appendChild(li);

}
const changeNick = (list) => {
  const listaUsuarios = document.querySelector('#usuarios');
  listaUsuarios.innerHTML = '';

  makeUserLi(listaUsuarios, thisUser)

  list.forEach(user => {
    if (user !== thisUser) {
      makeUserLi(listaUsuarios, user)
    }
  });
};

socket.on('conectedAs', (newNickname) => createUsuario(newNickname));
socket.on('loginList', (list) => changeNick(list));

socket.on('message', (message) => createMessage(message));