// date-fns
import {
  lightFormat,
  fromUnixTime,
  formatISO,
  startOfWeek,
  getUnixTime
} from "date-fns";

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
  const date = fromUnixTime(+seconds);
  return lightFormat(getUTCDate(date), "HH:mm:ss");
};

export const getStartWeek = (time?: string) => {
  const startOfWeekDate = startOfWeek(time ? fromUnixTime(+time) : new Date());

  return {
    startWeek: formatISO(startOfWeekDate),
    startWeekSec: getUnixTime(startOfWeekDate)
  };
};
