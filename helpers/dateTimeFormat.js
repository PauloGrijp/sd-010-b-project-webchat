const dateTimeFormat = (date) => {
  // const date = new Date();
  const optionsDate = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: true };
  const dateTime = `${date
    .toLocaleDateString('us', optionsDate)
    .split('/')
    .join('-')} ${date.toLocaleTimeString('us', optionsTime)}`;
  return dateTime;
};

module.exports = {
  dateTimeFormat,
};
