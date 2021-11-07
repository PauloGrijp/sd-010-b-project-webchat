const xablau = [];

const addGuest = (nickname, socket) => {
  xablau.push({
    nome: nickname,
    id: socket.id,
  });
  return xablau;
};
const editGuest = (nickname, socket) => {
  const indexAchado = xablau.findIndex((item) => item.id === socket.id);
  xablau[indexAchado].nome = nickname;
  return xablau;
};
const getGuests = () => xablau;

const excludeGuest = (socket) => {
  const indexAchado = xablau.findIndex((item) => item.id === socket.id);
  xablau.splice(indexAchado, 1);
  return xablau;
};

module.exports = { addGuest, getGuests, editGuest, excludeGuest };