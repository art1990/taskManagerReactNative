// date-fns
import {
  lightFormat,
  eachDayOfInterval,
  startOfDay,
  endOfDay,
  fromUnixTime,
  eachWeekOfInterval,
  formatISO,
  isSameDay,
  differenceInSeconds,
  getHours,
  endOfHour,
  startOfHour,
} from "date-fns";
// utils
import { getStartWeek, getEndWeek } from "./date";
import { randomColor } from "randomcolor";
// type
import { IChartsState } from "../redux/charts";
import { IWeeksListProps, IWeekData } from "../types";

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
      let dayLabel = generateDayLabel(startDate);
      let dayLabelEndDate = generateDayLabel(endDate);

      const isDayInWeek = eachWeekOfInterval(
        {
          start: startDate,
          end: endDate,
        },
        {
          weekStartsOn: 1,
        }
      ).find((el) => formatISO(el) === formatISO(startWeek));

      if (!isDayInWeek) return;

      if (!(dayLabel in weekObj)) {
        startDate = startWeek;
        dayLabel = generateDayLabel(startWeek);
      }
      if (!(dayLabelEndDate in weekObj)) {
        endDate = endWeek;
        dayLabelEndDate = generateDayLabel(endWeek);
      }

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
  console.log(weekObj);

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
      tasksId.push(id);
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

// day
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

  return { data, barColors };
};
