const dataAtual = new Date();
const dia = (dataAtual.getDate() < 10 ? '0' : '') + dataAtual.getDate();
const mes = ((dataAtual.getMonth() + 1) < 10 ? '0' : '') + (dataAtual.getMonth() + 1);

// Peguei no site https://www.devmedia.com.br/como-criar-um-chat-com-node-js/33719
module.exports = () => {
  const ano = dataAtual.getFullYear();
  const hora = (dataAtual.getHours() < 10 ? '0' : '') + dataAtual.getHours();
  const minuto = (dataAtual.getMinutes() < 10 ? '0' : '') + dataAtual.getMinutes();
  const segundo = (dataAtual.getSeconds() < 10 ? '0' : '') + dataAtual.getSeconds();
  const dataFormatada = `${dia}-${mes}-${ano} ${hora}:${minuto}:${segundo}`;
  return dataFormatada;
};
