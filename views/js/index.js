const socket = window.io();

    const inboxPeople = document.querySelector('#users-online');
    const inboxMessage = document.querySelector('#messages');
    const inputMessage = document.querySelector('#input-message');
    const formMessage = document.querySelector('#form-message');
    const formNickname = document.querySelector('#form-aside');
    const NicknameInput = document.querySelector('#name');

    let userName = '';

    const addNewMessage = (chatMessage) => {
      const receivedMsg = document.createElement('li');
      receivedMsg.setAttribute('data-testid', 'message');
      receivedMsg.innerText = chatMessage;
      inboxMessage.appendChild(receivedMsg);
    };

    /*
      Função para gerar nickName randomizado
      FONTE: https://www.ti-enxame.com/pt/javascript/gere-stringcaracteres-aleatorios-em-javascript/967048592/
    */
      const dec2hex = (dec) => (`0${dec.toString(16)}`).substr(-2);
      const generateNickName = (len) => {
        const arr = new Uint8Array((len || 40) / 2);
        window.crypto.getRandomValues(arr);
        return Array.from(arr, dec2hex).join('');
      };
      
      const addToUsersBox = (nickName) => {
        if (document.getElementById(`${nickName}`)) {
          return;
        }
        sessionStorage.setItem('nickname', nickName); 
        const userBox = document.createElement('li');
        userBox.setAttribute('data-testid', 'online-user');
        userBox.setAttribute('id', `${nickName}`);
        userBox.innerText = nickName;
        inboxPeople.appendChild(userBox);
      };

    const newUserConnected = (user) => {
      userName = user || generateNickName(16);
      socket.emit('new user', userName);
      addToUsersBox(userName);
      sessionStorage.setItem('nickname', userName);
    };

    // new user is created so we generate nickname and emit event
    newUserConnected();

    // FORM --------------------------------------------------------
    formMessage.addEventListener('submit', (e) => {
      e.preventDefault();
      socket.emit('message', {
        chatMessage: inputMessage.value,
        nickname: userName,
      });
      inputMessage.value = '';
      return false;
    });

    formNickname.addEventListener('submit', (e) => {
        e.preventDefault();
        const oldNickName = userName;
        userName = NicknameInput.value;
        NicknameInput.value = '';
        socket.emit('edit user', { newNickName: userName, oldNickName });
      });

    socket.on('new user', (data) => {
      inboxPeople.textContent = '';
      data.forEach((user) => addToUsersBox(user.data));
    });
    socket.on('edit user', (data) => {
      inboxPeople.textContent = '';
      data.forEach((user) => addToUsersBox(user.data));
    });

    socket.on('message', (message) => {
      addNewMessage(message);
    });

    socket.on('user disconnected', ({ data }) => {
      document.getElementById(`${data}`).remove();
    });

    // const socket = io();
    // const form = document.querySelector('#form');
    // const formNickname = document.querySelector('#form-aside');
    // const chatMessage = document.querySelector('#input-message');
    // const nickname = document.querySelector('#name');
    // let idUser = '';
    // let arrayUsers = '';

    // const newNickName = () => {
    //   const randomNickName = generateNickName(16)
    //   const formatNickname = nickname.value ? nickname.value : randomNickName;
    //   sessionStorage.setItem('nickname', formatNickname);
    //   return formatNickname;
    // }

    // const renderUser = (arrayUsersOn) => {
    //   const ul = document.querySelector('#users-online');
    //   const allRenderedUsers = document.querySelector(`${idUser}`);

    //   arrayUsersOn.forEach(({
    //     nickname,
    //     idSocket
    //   }) => {
    //     const li = document.createElement('li');
    //     li.setAttribute('data-testid', 'online-user');
    //     li.setAttribute('id', `${idSocket}`);
    //     li.className = 'users'
    //     li.innerText = nickname;
    //     ul.appendChild(li);
    //   });
    // }

    // const renderMessageLi = (fullMessage) => {
    //   const ul = document.querySelector('#messages');
    //   const li = document.createElement('li');
    //   li.setAttribute('data-testid', 'message')
    //   li.innerText = fullMessage;
    //   ul.appendChild(li);
    // };

    // // FORMS -------------------------------------------------------------------------------
    //

    // // eventos ------------------------------------------------
    // socket.emit('firstLoading', newNickName());

    // // socket.on('getSocketId', (id) => {
    // //   idUser = id;
    // // });

    // socket.on('firstLoading', (arrayUsersOn, id) => {
    //   // console.log(id, 'OOJOKOKIOKOK')
    //   idUser = id;
    //   arrayUsers = arrayUsersOn;
    //   renderUser(arrayUsers);
    // });

    // socket.on('message', (fullMessage) => renderMessageLi(fullMessage))