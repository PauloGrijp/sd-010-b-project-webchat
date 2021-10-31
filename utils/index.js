// Função de data e hora foi sugerido pelo colega Renato Graça

const getFullDateNow = () => {
  const dateNow = new Date();
  return `${dateNow.getDate()}-${dateNow.getMonth() + 1}-${dateNow.getFullYear()}`;
};

const getFullTimeNow = () => {
  const dateNow = new Date();
  let minutes = dateNow.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${dateNow.getHours()}:${minutes}-${dateNow.getSeconds()}`;
};

// https://www.webtutorial.com.br/funcao-para-gerar-uma-string-aleatoria-random-com-caracteres-especificos-em-javascript

const randomNickname = (number) => {
    let string = '';
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < number; i += 1) {
        string += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return string;
};

module.exports = {
  getFullDateNow,
  getFullTimeNow,
  randomNickname,
};