// firebase
import { db } from "../../fireBase";
// utils
import { dateNow } from "../../utils/date";
import { generateTasksData } from "../../utils/facker";

export const generateTasksApi = async ({ tasksListCol, weeksCol }) => {
  const batch = db.batch();

  const { tasks, generateWeeks } = generateTasksData();

  tasks.forEach((task) => {
    let doc = tasksListCol.doc();
    task.id = doc.id;
    const date = dateNow(task.startTaskTime);

    batch.set(doc, { ...task, id: task.id, date });
  });

  const weeks = generateWeeks(tasks);

  Object.entries(weeks).forEach(([startWeek, { tasksId, startWeekSec }]) => {
    const weekDoc = weeksCol.doc(startWeek);

    batch.set(weekDoc, {
      tasksId,
      timestamp: startWeek,
      startWeek: startWeekSec,
    });
  });

  await batch.commit();
};
