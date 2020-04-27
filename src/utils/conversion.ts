// date-fns
import {
  isSameDay,
  fromUnixTime,
  getUnixTime,
  startOfDay,
  endOfDay,
} from "date-fns";
import isWithinInterval from "date-fns/isWithinInterval";
// utils
import { convertToDate } from "./date";

// utils for day
const isInRange = (current, start, end) => {
  const currentDate = convertToDate(current);
  const startDate = startOfDay(convertToDate(start));
  const endDate = endOfDay(convertToDate(end));

  return isWithinInterval(currentDate, { start: startDate, end: endDate });
};

// logged per day
export const conversionToLoggedPerDay = (data) => {
  const { weeksList, currentPerDay } = data;
  // const currentPerDay = getUnixTime(new Date(2020, 3, 17));
  const tasksList = weeksList
    .filter((task) =>
      task.timeInterval.find(({ startTime, endTime }) =>
        isInRange(currentPerDay, startTime, endTime)
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

// calendar
export const conversionToCalendar = (data) => {
  /*** if wee want to convert second from WeekCalendar
       to Date obj we need use new Date() ***/
  console.log(data);
  const { weeksList, currentPerDay } = data;
  const tasksList = weeksList
    .filter((task) => {
      if (!task.isCompleted) return false;

      return isInRange(currentPerDay, task.startTaskTime, task.endTime);
    })

    .map(({ timeinterval, ...task }) => task);
  return { tasksList, currentDay: getUnixTime(currentPerDay) };
};
