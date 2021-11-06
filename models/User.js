const { ObjectID } = require('mongodb');
const connection = require('./connection');

const getAllUsers = async () => (
    connection().then((db) => db.collection('users').find().toArray())
);

const getUserByName = async (userName) => (
    connection().then((db) => db.collection('users').findOne({ userName })));

const getUserBySocketId = async (socketId) => (
    connection().then((db) => db.collection('users').findOne({ socketId })));

const createUser = async (user) => (
    connection().then((db) => db.collection('users').insertOne(user))
);

const updateUser = async (id, user) => (
    connection().then(
        (db) => db.collection('users').updateOne({ _id: ObjectID(id) }, { $set: user }),
    ));

const removeUser = async (userId) => (
    connection().then((db) => db.collection('users').deleteOne({ _id: ObjectID(userId) })));

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    getUserByName,
    getUserBySocketId,
    removeUser,
};