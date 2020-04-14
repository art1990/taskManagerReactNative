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
  differenceInSeconds,
} from "date-fns";
// types
import { IWeeksListProps, IWeekData } from "../types";
import { IChartsState } from "../redux/charts/index";

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

export const formatToUTCTime = (seconds) => {
  const date = fromUnixTime(+seconds);
  return lightFormat(getUTCDate(date), "HH:mm:ss");
};

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

// week
const generateDayLabel = (date: Date): string => lightFormat(date, "dd.MM");

const generateDayOfWeeklist = (
  day: number
): {
  weekObj: {
    [key: string]: number;
  };
  startWeek: Date;
  endWeek: Date;
} => {
  const { date: startWeek } = getStartWeek(day);
  const { date: endWeek } = getEndWeek(day);
  const weekObj = {};
  eachDayOfInterval({ start: startWeek, end: endWeek }).forEach(
    (el) => (weekObj[generateDayLabel(el)] = 0)
  );

  console.log(startWeek);

  return {
    weekObj,
    startWeek: startOfDay(startWeek),
    endWeek: endOfDay(endWeek),
  };
};

export const generateWeekForTime = ({
  startWeek: day,
  weeksList,
}: {
  startWeek: IChartsState["loggedTime"]["startWeek"];
  weeksList: IWeeksListProps["weeksList"];
}): IWeekData => {
  let { weekObj, startWeek, endWeek } = generateDayOfWeeklist(day);

  weeksList.forEach(({ timeInterval }) =>
    timeInterval.forEach(({ startTime, endTime }) => {
      let startDate = fromUnixTime(startTime);
      let endDate = fromUnixTime(endTime);
      const dayLabel = generateDayLabel(startDate);
      const dayLabelEndDate = generateDayLabel(endDate);

      startDate = dayLabel in weekObj ? startDate : startWeek;
      endDate = dayLabelEndDate in weekObj && endDate ? endDate : endWeek;

      isSameDay(startDate, endDate)
        ? (weekObj[dayLabel] += differenceInSeconds(endDate, startDate))
        : eachDayOfInterval({ start: startDate, end: endDate }).forEach(
            (date, i, arr) => {
              const dayLabel = generateDayLabel(date);
              // if (!(dayLabel in weekObj)) return;

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
    })
  );
  const data = [];
  const labels = [];

  Object.entries(weekObj).forEach(([label, hour]) => {
    labels.push(label);
    data.push(hour / 3600);
  });

  return { data, labels };
};

export const generateWeekForTask = ({
  startWeek,
  weeksList,
}: {
  startWeek: IChartsState["loggedTasks"]["startWeek"];
  weeksList: IWeeksListProps["weeksList"];
}) => {
  let weekObj = generateDayOfWeeklist(startWeek);

  weeksList.forEach(({ startTaskTime, endTime, duration }) => {
    const startDate = fromUnixTime(startTaskTime);
    const dayLabel = generateDayLabel(startDate);
    if (!(dayLabel in weekObj)) return;

    weekObj[dayLabel] += 1;
  });

  const data = [];
  const labels = [];

  Object.entries(weekObj).forEach(([label, count]) => {
    labels.push(label);
    data.push(count);
  });

  return { data, labels };
};
