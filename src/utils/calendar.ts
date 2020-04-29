// utils
import {
  fromUnixTime,
  isSameDay,
  getHours,
  getMinutes,
  differenceInSeconds,
  startOfDay,
  endOfDay,
} from "date-fns";

const getHeight = (duration) => (duration / 60) * 0.5;

export const generateForCalendar = ({ tasksList: tasks, currentDay }) => {
  const allHourObj = Object.assign({}, [...new Array(12)]);
  const hourObj = Object.assign(
    {},
    ...Object.keys(allHourObj).map((key) => ({ [+key * 2]: [] }))
  ); // even hour object
  const current = fromUnixTime(currentDay);

  tasks.forEach(({ timeInterval, id, title }) => {
    timeInterval.forEach(({ startTime, endTime }) => {
      let start = fromUnixTime(startTime);
      let end = fromUnixTime(endTime);

      start = !isSameDay(start, current) ? startOfDay(current) : start;
      end = !isSameDay(end, current) ? endOfDay(current) : end;

      const duration = differenceInSeconds(end, start);
      const height = getHeight(duration);
      const hour = getHours(start);
      const minutes = getMinutes(start);
      const marginTop =
        (hour === 0 ? hour : 1) * minutes * 0.5 + (!!(hour % 2) ? 30 : 0);
      const evenHour = (!!(hour % 2) ? hour - 1 : hour).toString(10);
      hourObj[evenHour].push({
        id,
        title,
        duration,
        style: { marginTop, height },
      });
    });
  });

  return Object.entries(hourObj).sort((a, b) => +a[0] - +b[0]);
};
