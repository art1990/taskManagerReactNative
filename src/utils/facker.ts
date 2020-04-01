// faker
import faker from "faker";
// date-fns
import { getUnixTime } from "date-fns";
// utils
import { getStartWeek } from "./date";

let date = getUnixTime(new Date());

const generateTask = () => {
  const { random, hacker } = faker;

  const id = random.uuid();
  const title = hacker.noun();
  const project = hacker.noun();
  const isCompleted = random.boolean();
  const isPaused = true;
  const file = null;
  const tags = [];

  const duration = random.number({ min: 5, max: 80000 });

  const startTaskTime = +date;
  const startTime = startTaskTime;
  const endTime = startTime + duration;

  const timestamp = startTaskTime;
  date = (+date + duration).toString();

  return {
    id,
    title,
    project,
    isCompleted,
    isPaused,
    file,
    tags,
    duration,
    startTaskTime,
    startTime,
    endTime,
    timestamp
  };
};

export const generateTasksData = () => {
  return {
    tasks: [...Array(10)].map(el => {
      const task = generateTask();
      return task;
    }),
    generateWeeks(tasks) {
      const weeks = {};

      tasks.forEach(el => {
        const { startWeek, startWeekSec } = getStartWeek(el.startTime);
        weeks[startWeek] = {
          tasksId: [...(weeks[startWeek]?.tasksId || []), el.id],
          startWeekSec
        };
      });
      return weeks;
    }
  };
};
