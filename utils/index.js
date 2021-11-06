  // FONTE: https://www.ti-enxame.com/pt/javascript/gere-stringcaracteres-aleatorios-em-javascript/967048592/
  
  function geraNickName() {
    var chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var nickname = '';
    for (var i = 0; i < 16; i++) {
      var r = Math.floor(Math.random() * chars.length);
      nickname += chars.substring(r, r + 1);
    }
    return nickname;
  }

  module.exports = {
    geraNickName
  }
  