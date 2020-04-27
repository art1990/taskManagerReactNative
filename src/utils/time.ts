export const generateHourList = () =>
  [...new Array(13).keys()].map((el, i, arr) => {
    // if (i == arr.length - 1) return "00:00";
    return `${el < 5 ? "0" : ""}${el * 2}:00`;
  });
