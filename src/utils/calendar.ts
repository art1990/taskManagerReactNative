// utils
import { fromUnixTime, isSameDay, getHours, getMinutes } from "date-fns";

export const generateForCalendar = ({ tasksList: tasks, currentDay }) => {
  const hourObj = Object.assign({}, [...new Array(23).fill([])]);
  const current = fromUnixTime(currentDay);

  tasks.forEach(({ startTaskTime, duration, title, id }) => {
    const start = fromUnixTime(startTaskTime);
    const height = (duration / 60) * 0.5;

    if (!isSameDay(start, current)) {
      return hourObj["0"].push({ id, title, marginTop: 0, height });
    }
    const hour = getHours(start).toString(10);
    const minutes = getMinutes(start);
    const marginTop = minutes * 0.5;
    hourObj[hour].push({ id, title, marginTop, height });
  });

  return Object.entries(hourObj).sort((a, b) => +a[0] - +b[0]);
};
