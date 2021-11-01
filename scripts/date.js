// BASED ON *https://pt.stackoverflow.com/questions/6526/como-formatar-data-no-javascript*

const setMoment = () => {
  const date = new Date();
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const moment = date.toLocaleTimeString('en-US', { hour12: true });

  return `${day}-${month}-${year} ${moment}`;
};

module.exports = {
  setMoment,
};