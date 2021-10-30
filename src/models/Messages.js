const moment = require('moment');
const connection = require('./connection');

class Messages {
  constructor() {
    this.db = connection().then((db) => db.collection('messages'));
  }

  static serialize({ nickname, chatMessage, date }) {
    return `${date} - ${nickname}: ${chatMessage}`;
  }

  async createMessage(message) {
    const db = await this.db;
    const date = moment().format('DD-MM-yyyy HH:mm:ss');
    const { ops } = await db.insertOne({ ...message, date });
    return this.constructor.serialize(ops[0]);
  }

  async getAll() {
    const db = await this.db;
    const messages = await db.find().toArray();
    return messages.map(this.constructor.serialize);
  }
}

module.exports = Messages;
