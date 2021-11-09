const { MongoClient } = require('mongodb');
require('dotenv').config();

let schema = null;

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

async function connection() {
  if (schema) return Promise.resolve(schema);
  return MongoClient
    .connect(process.env.DB_URL, OPTIONS)
    .then((conn) => conn.db(process.env.DB_NAME))
    .then((dbSchema) => {
      schema = dbSchema;
      return schema;
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

module.exports = connection;
