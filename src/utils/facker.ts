// faker
import faker from "faker";
// date-fns
import { getUnixTime, isSameWeek } from "date-fns";
// utils
import { getStartWeek } from "./date";
// types
import { ITask } from "../types";

let date = getUnixTime(new Date());

const generateTask = (): ITask => {
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
  const arr = new Array(random.number({ min: 1, max: 10 })).fill(1);
  const timeInterval = arr.map((_, i, { length }) => {
    const max = Math.floor(duration / length);

    const start = startTime + max * i;
    const end =
      i === length - 1 ? endTime : start + random.number({ min: 1, max });

    return {
      startTime: start,
      endTime: end,
    };
  });

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
    timeInterval,
    timestamp,
  };
};

export const generateTasksData = () => {
  return {
    tasks: [...Array(10)].map((el) => {
      const task = generateTask();
      return task;
    }),
    generateWeeks(
      tasks: ITask[]
    ): { [key: string]: { tasksId?: ITask["id"][]; startWeekSec?: string } } {
      const weeks = {};

      tasks.forEach((el) => {
        do {
          const { startWeek, startWeekSec } = getStartWeek(el.startTime);
          weeks[startWeek] = {
            tasksId: [...(weeks[startWeek]?.tasksId || []), el.id],
            startWeekSec,
          };
        } while (
          !isSameWeek(el.startTaskTime, el.endTime, { weekStartsOn: 1 })
        );
      });
      return weeks;
    },
  };
};
