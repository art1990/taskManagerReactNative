// date-fns
import { lightFormat, fromUnixTime } from "date-fns";

export const getUTCDate = date => {
  //const date = new Date(dateString);

  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );
};

export const formatToUTCTime = seconds => {
  const date = fromUnixTime(seconds);
  return lightFormat(getUTCDate(date), "HH:mm:ss");
};
