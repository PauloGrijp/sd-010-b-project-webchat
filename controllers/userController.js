const userModel = require('../models/User');

const getUsers = async () => {
    const users = await userModel.getAllUsers();
    return users;
};

const insertUser = async (socketId, userName) => {
    const dbUserObject = { socketId, userName };
    const insertedUser = await userModel.createUser(dbUserObject);
    return insertedUser.ops[0];
};

const changeUser = async (user) => {
    const users = await userModel.getAllUsers();
    const previousUser = users.find((us) => us.userName === user.oldUserName);
    if (!previousUser) return users;
    const { socketId, userName } = user;
    const { _id: id } = previousUser;
    await userModel.updateUser(id, { socketId, userName });
    const prevIndex = users.indexOf(previousUser);
    users[prevIndex] = { socketId, userName };
    return users;
};

const removeUser = async (socketId) => {
    const users = await userModel.getAllUsers();
    const user = users.find((us) => us.socketId === socketId);
    if (!user) return users;
    const { _id: id, userName } = user;
    await userModel.removeUser(id);
    const userIndex = users.indexOf(user);
    users.splice(userIndex, 1);
    return { userName, users };
};

module.exports = {
    getUsers,
    insertUser,
    changeUser,
    removeUser,
};