// faker
import faker from "faker";
// date-fns
import { getUnixTime } from "date-fns";
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
  const timeInterval = arr.map((_, i, arr) => {
    const max = duration / arr.length;
    const delta = duration * (i + 1);

    return {
      startTime: delta,
      endTime: delta + random.number({ min: 1, max: max }),
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
        const { startWeek, startWeekSec } = getStartWeek(el.startTime);
        weeks[startWeek] = {
          tasksId: [...(weeks[startWeek]?.tasksId || []), el.id],
          startWeekSec,
        };
      });
      return weeks;
    },
  };
};
