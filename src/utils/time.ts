export const generateHourList = (arr) =>
  arr.map(([hour, tasksList]) => {
    // if (i == arr.length - 1) return "00:00";
    return [`${hour < 10 ? "0" : ""}${hour}:00`, tasksList];
  });
