  // FONTE: https://www.ti-enxame.com/pt/javascript/gere-stringcaracteres-aleatorios-em-javascript/967048592/
  //gera um nickname aleatório

  const dec2hex = (dec) => {
    return ('0' + dec.toString(16)).substr(-2)
  }
  const generateNickName = (len) => {
    var arr = new Uint8Array((len || 40) / 2)
    window.crypto.getRandomValues(arr)
  return Array.from(arr, dec2hex).join('')
  }
