const client = window.io();
const containerMsg = document.querySelector('#listMessages');
const textMessage = document.querySelector('#messageInput');
const ulUsers = document.querySelector('#list-users');
const submitMessage = document.querySelector('#formSendMessage');
const submitNickname = document.querySelector('#btn-nickname');
const inputNickname = document.querySelector('#input-nickname');

const randomString = (size) => {
  let string = '';
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < size; i += 1) {
    string += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return string;
};

let nickname = `Guest-${randomString(10)}`;

/* --------------------------------------------------------------------------------- */

const createMessage = (message) => {
  const messageElement = document.createElement('div');
  messageElement.classList.add('msg');
  const messageComponent = `
    <div class="msg-bubble">
      <div data-testid="message" class="msg-text">
        ${message}
      </div>
    </div>
  `;
  messageElement.innerHTML = messageComponent;
  return messageElement;
};

const createUser = (user) => {
  const userElement = document.createElement('li');
  userElement.dataset.testid = 'online-user';
  userElement.textContent = user;
  ulUsers.append(userElement);
};

/* --------------------------------------------------------------------------------- */

submitMessage.addEventListener('submit', (event) => {
  event.preventDefault();
  client.emit('message', { chatMessage: textMessage.value, nickname });
  textMessage.value = '';
});

submitNickname.addEventListener('click', () => {
  nickname = inputNickname.value;
  client.emit('updateNickname', inputNickname.value);
});

/* --------------------------------------------------------------------------------- */

client.emit('init', nickname);

client.on('init', (messages) => {
  messages.forEach((message) => {
    const newMessage = createMessage(message);
    containerMsg.append(newMessage);
  });
});

client.on('updateUsers', (users) => {
  ulUsers.innerHTML = '';
  const removeUser = users.filter((user) => user !== nickname);
  [nickname, ...removeUser].forEach(createUser);
});

client.on('message', (message) => {
  const newMessage = createMessage(message);
  containerMsg.append(newMessage);
});