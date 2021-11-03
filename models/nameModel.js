let allUsers = [];

const createUserM = (data) => {
  allUsers.push(data);
  return allUsers;
};
const deleteUserM = (nameId) => {
  allUsers = allUsers.filter((user) => user.nameId !== nameId).slice();
  return allUsers;
};
const updateNameM = (data) => {
  allUsers = allUsers.map((user) => {
    if (user.nameId === data.nameId) {
      return { nameId: data.nameId, databaseNickname: data.databaseNickname };
    }
    return user;
  }).slice();
  return allUsers;
};

module.exports = {
  createUserM,
  deleteUserM,
  updateNameM,
};