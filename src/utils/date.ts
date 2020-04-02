// date-fns
import {
  lightFormat,
  fromUnixTime,
  formatISO,
  startOfWeek,
  getUnixTime,
  endOfWeek,
  eachDayOfInterval,
  startOfDay,
  endOfDay,
  isSameDay,
  differenceInSeconds
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

// utils for week func
const getStartOrEndWeek = (func: (date: Date) => Date) => (
  week: string,
  weekSec: string,
  time?: string | number
): { [x: string]: any } => {
  const weekDate = func(time ? fromUnixTime(+time) : new Date());

  return {
    [week]: formatISO(weekDate),
    [weekSec]: getUnixTime(weekDate),
    date: weekDate
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

// week
const generateDayLabel = date => lightFormat(date, "dd.MM");

const generateDayOfWeeklist = day => {
  const { date: start } = getStartWeek(day);
  const { date: end } = getEndWeek(day);
  const res = {};
  eachDayOfInterval({ start, end }).forEach(
    el => (res[generateDayLabel(el)] = 0)
  );

  return res;
};

export const generateWeek = (weeksList: []): {} => {
  const day = weeksList[0].startTaskTime;
  let weekObj = generateDayOfWeeklist(day);

  weeksList.forEach(({ startTaskTime, endTime, duration }) => {
    const startDate = fromUnixTime(startTaskTime);
    const endDate = fromUnixTime(endTime);
    const dayLabel = generateDayLabel(startDate);
    isSameDay(startTaskTime, endTime)
      ? (weekObj[dayLabel] += duration)
      : eachDayOfInterval({ start: startDate, end: endDate }).forEach(
          (el, i, arr) => {
            const dayLabel = generateDayLabel(el);

            weekObj[dayLabel] +=
              i === 0
                ? differenceInSeconds(endOfDay(startDate), startDate)
                : i === arr.length - 1
                ? differenceInSeconds(endDate, startOfDay(startDate))
                : 86400;
          }
        );
  });

  const data = [];
  const labels = [];

  Object.entries(weekObj).forEach(([label, hour]) => {
    labels.push(label);
    data.push(hour / 3600);
  });
  return { data, labels };
};
