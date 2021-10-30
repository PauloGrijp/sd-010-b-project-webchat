class Socket {
  constructor() {
    this.users = {};
  }

  changeUser(id, nickname) {
    this.users[id] = nickname;
  }

  removeUser(id) {
    delete this.users[id];
  }

  getAll() {
    return Object.values(this.users);
  }
}

module.exports = Socket;
