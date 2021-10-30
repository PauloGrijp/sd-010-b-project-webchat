    const currentDate = () => {
      const dateNow = new Date();
      const date = `${dateNow.getDate()}-${dateNow.getMonth() + 1}-${dateNow.getFullYear()}`;
      const currentDateAndHour = `${date} ${dateNow.toLocaleTimeString('pt-br')}`;

      return currentDateAndHour;
    };

  module.exports = currentDate;