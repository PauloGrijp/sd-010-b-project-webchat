  // FONTE: https://www.ti-enxame.com/pt/javascript/gere-stringcaracteres-aleatorios-em-javascript/967048592/
  
  function geraNickName() {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let nickname = '';
    for (let i = 0; i < 16; i += 1) {
      const r = Math.floor(Math.random() * chars.length);
      nickname += chars.substring(r, r + 1);
    }
    return nickname;
  }

  module.exports = {
    geraNickName,
  };
