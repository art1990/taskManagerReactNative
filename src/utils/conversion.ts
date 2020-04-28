// date-fns
import { getUnixTime, startOfDay, endOfDay } from "date-fns";
import isWithinInterval from "date-fns/isWithinInterval";
// utils
import { convertToDate } from "./date";
// type
import { IWeek } from "./charts";
import { IChartsState } from "../redux/charts";

// utils for day
const isInRange = (current, start, end) => {
  const currentDate = convertToDate(current);
  const startDate = startOfDay(convertToDate(start));
  const endDate = endOfDay(convertToDate(end));

  return isWithinInterval(currentDate, { start: startDate, end: endDate });
};

interface IConversionToDay {
  weeksList: IWeek[];
  currentPerDay: IChartsState["meta"]["currentPerDay"];
}

interface ICalendarReturn {
  tasksList: Omit<IWeek, "timeInterval">[];
  currentDay: IChartsState["meta"]["currentPerDay"];
}

// logged per day
export const conversionToLoggedPerDay = (
  data: IConversionToDay
): {
  tasksList: IConversionToDay["weeksList"];
  currentDay: IConversionToDay["currentPerDay"];
} => {
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
        isInRange(currentPerDay, el.startTime, el.endTime)
      );

      return { ...task, timeInterval };
    });

  return { tasksList, currentDay: currentPerDay };
};

// calendar
export const conversionToCalendar = (
  data: IConversionToDay
): ICalendarReturn => {
  /*** if wee want to convert second from WeekCalendar
       to Date obj we need use new Date() ***/
  const { weeksList, currentPerDay } = data;
  const filtertasksList = weeksList.filter((task) => {
    if (!task.isCompleted) return false;
    return task.timeInterval.find(({ startTime, endTime }) =>
      isInRange(currentPerDay, startTime, endTime)
    );
  });

  const tasksList = filtertasksList.map((task) => {
    const timeInterval = task.timeInterval.filter((el) =>
      isInRange(currentPerDay, el.startTime, el.endTime)
    );

    return { ...task, timeInterval };
  });
  return { tasksList, currentDay: getUnixTime(currentPerDay) };
};
