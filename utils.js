const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        // Gerando a HASH!
        // https://www.programiz.com/javascript/examples/generate-random-strings

const generateString = (length) => {
  let result = ' ';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

module.exports = generateString;
