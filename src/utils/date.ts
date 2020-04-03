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
// interface
import { IWeeksList } from "../components/LineChart";

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
const generateDayLabel = (date: Date): string => lightFormat(date, "dd.MM");

const generateDayOfWeeklist = (day: number): { [key: string]: number } => {
  const { date: start } = getStartWeek(day);
  const { date: end } = getEndWeek(day);
  const res = {};
  eachDayOfInterval({ start, end }).forEach(
    el => (res[generateDayLabel(el)] = 0)
  );

  return res;
};

export const generateWeekForTime = (
  weeksList: IWeeksList["weeksList"]
): { data: number[]; labels: string[] } => {
  const day = weeksList[0].startTaskTime;
  let weekObj = generateDayOfWeeklist(day);

  weeksList.forEach(({ startTaskTime, endTime }) => {
    const startDate = fromUnixTime(startTaskTime);
    const endDate = endTime ? fromUnixTime(endTime) : new Date();
    const dayLabel = generateDayLabel(startDate);

    isSameDay(startDate, endDate)
      ? (weekObj[dayLabel] += differenceInSeconds(endDate, startDate))
      : eachDayOfInterval({ start: startDate, end: endDate }).forEach(
          (date, i, arr) => {
            const dayLabel = generateDayLabel(date);
            if (!(dayLabel in weekObj)) return;

            const lastDuration = isSameDay(endDate, date)
              ? differenceInSeconds(date, startOfDay(date))
              : 86400;

            weekObj[dayLabel] +=
              i === 0
                ? differenceInSeconds(endOfDay(startDate), startDate)
                : i === arr.length - 1
                ? lastDuration
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

export const generateWeekForTask = (weeksList: IWeeksList["weeksList"]) => {};
