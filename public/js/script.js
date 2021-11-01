const socket = window.io();

window.onbeforeunload = (_event) => {
  socket.disconnect();
};