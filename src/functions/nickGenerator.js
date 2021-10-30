const nickGenerator = () => {
  let id = '';
  const string = 'abcdefghijklmnopqrstuvwyxz';
  string.split('').forEach(() => {
    if (id.length !== 16) {
      id += string[Math.floor(Math.random() * (string.length - 1))];
    }
  });
  return id;
};

module.exports = { nickGenerator };
