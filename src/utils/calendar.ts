// utils
import {
  fromUnixTime,
  isSameDay,
  getHours,
  getMinutes,
  differenceInSeconds,
  startOfDay,
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
      const start = fromUnixTime(startTime);
      const duration = endTime - startTime;
      let height = getHeight(duration);

      if (!isSameDay(start, current)) {
        const newDutration =
          duration -
          differenceInSeconds(startOfDay(current), fromUnixTime(startTime));

        height = getHeight(newDutration);

        return hourObj["0"].push({ id, title, marginTop: 0, height });
      }
      const hour = getHours(start);
      const minutes = getMinutes(start);
      const marginTop = minutes * 0.5 + (!!(hour % 2) ? 30 : 0);
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
