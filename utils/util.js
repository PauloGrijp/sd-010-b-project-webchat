const dataCerta = () => {
  const date = new Date();
  const data = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  return data;
};

const horaCerta = () => {
  const date = new Date();
  let minutos = date.getMinutes();

  if (minutos < 10) {
    minutos = `0${minutos}`;
  }

  const hourAndMinute = `${date.getHours()}:${minutos}:${date.getSeconds()}`; 
  return hourAndMinute;
};

const createNickname = (tamanho) => {
  let stringAleatoria = '';
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i < tamanho; i += 1) {
  stringAleatoria += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return stringAleatoria;
}; 

module.exports = {
  dataCerta,
  horaCerta,
  createNickname,
};