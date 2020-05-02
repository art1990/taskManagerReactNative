// utils
import { getStartWeek } from "../../utils/date";
// interface
import { ITaskState } from "../../redux/task";

type TWeekObj = Omit<ITaskState["taskData"], "isPaused" | "file" | "project">;

export const getWeekDataApi = async ({ weeksCol, tasksListCol, ...meta }) => {
  const getDataFromDoc = (doc: any): { tasksId: string; startWeek: number } =>
    Array.isArray(doc.docs) ? doc.docs[0].data() : doc.data();
  const { size: totalWeeks }: { size: number } = await weeksCol.get();

  const {
    currentWeekTimeNumber,
    currentWeekTaskNumber,
    lastVisibleRequest,
    currentPerDay,
    action,
  } = meta;

  const currentWeekNumber = currentWeekTimeNumber || currentWeekTaskNumber;
  let currentDay = currentPerDay;

  const lastSnapshot =
    (currentWeekTimeNumber || currentWeekTaskNumber) && lastVisibleRequest;

  const cursor = action === "next" ? "startAfter" : "startAt";

  const { startWeek: start, startWeekSec } =
    (currentPerDay && getStartWeek(currentPerDay)) || {};

  let weekDoc = currentPerDay
    ? await weeksCol.doc(start).get()
    : currentWeekNumber === 1
    ? await weeksCol.limit(1).get()
    : await weeksCol[cursor](lastSnapshot).limit(1).get();

  const lastVisible = !currentPerDay && weekDoc.docs[weekDoc.docs.length - 1];
  if (!weekDoc.exists && !!currentPerDay) {
    weekDoc = await weeksCol.limit(1).get();
    currentDay = startWeekSec;
  }

  const { tasksId, startWeek } = getDataFromDoc(weekDoc);

  const tasksDoc = await tasksListCol
    .where("id", "in", tasksId)
    .orderBy("timestamp")
    .get();

  const weeksList: TWeekObj[] = tasksDoc.docs.map(
    (doc: any): TWeekObj => {
      const {
        id,
        startTaskTime,
        duration = 0,
        endTime,
        timeInterval,
        isCompleted,
        title,
      } = doc.data();

      return {
        id,
        startTaskTime,
        duration,
        endTime,
        timeInterval,
        isCompleted,
        title,
      };
    }
  );

  return {
    weeksList,
    lastVisible,
    totalWeeks,
    startWeek,
    currentPerDay: currentDay,
  };
};
