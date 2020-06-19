import moment from "moment";
const getDate = date => {
    let newDate = parseInt(Date.parse(date)) / 1000;
    let currentDate = parseInt(Date.now()) / 1000;
    let result = currentDate - newDate;
    let seconds = 60;
    let minutes = 3570;
    let hours = 83895;
    if (result < seconds) {
      if (result < 1) {
        result = 1;
      }
      return Math.round(result) + "s";
    } else if (result < minutes) {
      return Math.round(result / seconds) + "m";
    } else if (result < hours) {
      return Math.round(result / minutes) + "h";
    } else {
      let finalDate = moment(date).format("ll");
      if (finalDate.split(", ")[1] === "2020") {
        return finalDate.split(", ")[0];
      }
      return finalDate;
    }
  };

  export default getDate;