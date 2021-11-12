const newDate = () => {
  const dateNow = new Date();
  const date = `${dateNow.getDate()}-${dateNow.getMonth() + 1}-${dateNow.getFullYear()}`;
  const dateAndHour = `${date} ${dateNow.toLocaleTimeString()}`;

  return dateAndHour;
};

module.exports = {
  newDate,
};