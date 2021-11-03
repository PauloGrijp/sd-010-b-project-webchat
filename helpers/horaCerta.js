// Função de hora atual ajuda do Renato GSouza
const horaCerta = () => {
    const date = new Date();
    const data = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    const hourAndMinute = `${date.getHours()}:${date.getMinutes()}`; 
    return `${data} ${hourAndMinute}`;
}; 

module.exports = horaCerta;