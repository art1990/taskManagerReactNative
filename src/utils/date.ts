// date-fns
import {
  lightFormat,
  fromUnixTime,
  formatISO,
  startOfWeek,
  getUnixTime,
  endOfWeek,
} from "date-fns";

export const getUTCDate = (date) => {
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

export const formatToUTCTime = (seconds, hasMounth) => {
  const date = fromUnixTime(+seconds);
  return format(getUTCDate(date), `HH:mm:ss${hasMounth ? " MMM d" : ""}`);
};

export const convertToDate = (data) =>
  typeof data === "number" ? fromUnixTime(data) : data;

// utils for week func
const getStartOrEndWeek = (
  func: (date: Date, options?: { weekStartsOn?: number }) => Date
) => (
  week: string,
  weekSec: string,
  time?: string | number
): { [x: string]: any } => {
  const weekDate = func(time ? fromUnixTime(+time) : new Date(), {
    weekStartsOn: 1,
  });

  return {
    [week]: formatISO(weekDate),
    [weekSec]: getUnixTime(weekDate),
    date: weekDate,
  };
};

export const getStartWeek = (time?: string | number) =>
  getStartOrEndWeek(startOfWeek)("startWeek", "startWeekSec", time);

export const getEndWeek = (time?: string | number) =>
  getStartOrEndWeek(endOfWeek)("endWeek", "endWeekSec", time);

export const dateNow = (date: Date | number = new Date()) => {
  const formatDate = typeof date === "number" ? fromUnixTime(date) : date;

  return lightFormat(formatDate, "dd/MM/yyyy");
};
