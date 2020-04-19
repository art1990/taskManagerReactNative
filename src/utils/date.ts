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
  getHours,
  endOfHour,
  startOfHour,
} from "date-fns";
// utils
import { randomColor } from "randomcolor";
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
            (date) => {
              const dayLabel = generateDayLabel(date);

              weekObj[dayLabel] += isSameDay(startDate, date)
                ? differenceInSeconds(endOfDay(startDate), startDate)
                : isSameDay(endDate, date)
                ? differenceInSeconds(endDate, startOfDay(endDate))
                : 86400;
            }
          );
    })
  );
  const data = [];
  const labels = [];

  Object.entries(weekObj).forEach(([label, seconds]) => {
    labels.push(label);
    data.push(seconds / 3600);
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
  let { weekObj } = generateDayOfWeeklist(startWeek);
  let tasksId = [];

  weeksList.forEach(({ timeInterval, id }) =>
    timeInterval.forEach(({ startTime }) => {
      const startDate = fromUnixTime(startTime);
      const dayLabel = generateDayLabel(startDate);
      if (!(dayLabel in weekObj) || tasksId.includes(id)) return;

      weekObj[dayLabel] += 1;
    })
  );

  const data = [];
  const labels = [];

  Object.entries(weekObj).forEach(([label, count]) => {
    labels.push(label);
    data.push(count);
  });

  return { data, labels };
};

export const generateForDay = ({ tasksList: tasks }) => {
  const tasksColorsList = randomColor({
    count: tasks.length,
    hue: "monochrome",
  });

  const tasksList = tasks.map(({ timeInterval }, i) => ({
    timeInterval,
    color: tasksColorsList[i],
  }));

  const dayWithHoursObj = {};
  [...new Array(24).keys()].forEach(
    (el) => (dayWithHoursObj[el] = { data: [], colors: [] })
  );

  tasksList.forEach((el) => {
    el.timeInterval.forEach(({ startTime, endTime }) => {
      const startDate = fromUnixTime(startTime);
      const endDate = fromUnixTime(endTime);
      const startHour = getHours(startDate);
      const endHour = getHours(endDate);

      for (let i = startHour; i <= endHour; i++) {
        const hour = dayWithHoursObj[i];
        const duration =
          startHour === endHour
            ? endTime - startTime
            : i === startHour
            ? differenceInSeconds(endOfHour(startDate), startDate)
            : i === endHour
            ? differenceInSeconds(endDate, startOfHour(endDate))
            : 3600;
        console.log("start", startHour, "end", endHour, duration / 60);
        hour.data.push(duration / 60);
        hour.colors.push(el.color);
      }
    });
  });

  const hourArr = Object.entries(dayWithHoursObj).sort((a, b) => +a[0] - +b[0]);
  const data = [];
  const barColors = [];
  hourArr.forEach(([_, el]) => {
    data.push(el.data);
    barColors.push(el.colors);
  });

  // console.log(hourArr);
  return { data, barColors };
};

// convert per day
export const convertResponseToPerDay = (data) => {
  const { weeksList, currentPerDay } = data;
  // const currentPerDay = getUnixTime(new Date(2020, 3, 17));
  const tasksList = weeksList
    .filter((task) =>
      task.timeInterval.find((el) =>
        isSameDay(fromUnixTime(currentPerDay), fromUnixTime(el.startTime))
      )
    )
    .map((task) => {
      const timeInterval = task.timeInterval.filter((el) =>
        isSameDay(fromUnixTime(currentPerDay), fromUnixTime(el.startTime))
      );

      return { ...task, timeInterval };
    });

  return { tasksList };
};
