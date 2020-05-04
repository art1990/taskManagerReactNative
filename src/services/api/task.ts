// firebase
import { firebase, storage, db } from "../../fireBase";
// date-fns
import { isSameWeek, addWeeks } from "date-fns";
// utils
import { getStartWeek } from "../../utils/date";

const getDataFromDoc = async (doc, field) => {
  const res = await doc.get();

  const { [field]: data } = res.data();

  return data;
};

const uploadFileApi = async (file, user) => {
  const response = await fetch(file.uri);
  const blob = await response.blob();

  const ref = storage.ref().child(`file/${user.uid}/${file.name}`);
  const snapshot = await ref.put(blob);

  const uri = await snapshot.ref.getDownloadURL();

  return uri;
};

export const createTaskApi = async ({
  task,
  userDoc,
  tasksListCol,
  weeksCol,
  user,
}) => {
  const batch = db.batch();
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  const { startWeek, startWeekSec } = getStartWeek();
  const taskData = {
    ...task,
    timestamp,
  };
  if (task.file) {
    task.file.uri = await uploadFileApi(task.file, user);
  }
  const doc = tasksListCol.doc();
  taskData.id = doc.id;
  batch.set(doc, taskData);
  batch.set(userDoc, { taskData });
  const weekDoc = weeksCol.doc(startWeek);

  batch.set(
    weekDoc,
    {
      tasksId: firebase.firestore.FieldValue.arrayUnion(doc.id),
      timestamp,
      startWeek: startWeekSec,
    },
    { merge: true }
  );

  batch.commit();

  return taskData;
};

export const removeTaskApi = async ({ id, tasksListCol }) => {
  await tasksListCol.doc(id).delete();
  return id;
};

export const pauseTaskApi = async ({
  weeksCol,
  userDoc,
  tasksListCol,
  task,
}) => {
  const batch = db.batch();
  const taskDoc = tasksListCol.doc(task.id);
  task.isPaused = true;

  batch.update(userDoc, { taskData: null });

  batch.update(taskDoc, task);

  let startTime = task.startTime;
  while (!isSameWeek(startTime, task.endTime, { weekStartsOn: 1 })) {
    const { startWeek } = getStartWeek(startTime);
    const weekDoc = weeksCol.doc(startWeek);

    batch.set(
      weekDoc,
      {
        tasksId: firebase.firestore.FieldValue.arrayUnion(task.id),
      },
      { merge: true }
    );

    startTime = addWeeks(startWeek, 1);
  }

  batch.commit();

  return task;
};

export const resumeTaskApi = async ({
  userDoc,
  tasksListCol,
  weeksCol,
  task,
}) => {
  const batch = db.batch();
  const { startWeek } = getStartWeek(task.startTime);
  const weekDoc = weeksCol.doc(startWeek);
  const taskDoc = tasksListCol.doc(task.id);

  const taskData = { ...task, isPaused: false };

  batch.set(
    weekDoc,
    {
      tasksId: firebase.firestore.FieldValue.arrayUnion(task.id),
    },
    { merge: true }
  );
  batch.update(taskDoc, taskData);
  batch.update(userDoc, { taskData });
  await batch.commit();

  return taskData;
};

export const updateTaskApi = async ({ tasksListCol, task }) => {
  await tasksListCol.doc(task.id).update(task);

  return task;
};

export const getTaskApi = async ({ id, tasksListCol }) => {
  const doc = await tasksListCol.doc(id).get();
  return doc.data();
};

export const getTaskListApi = async ({
  filters: defaultFilters,
  lastVisible,
  limit,
  tasksListCol,
  userDoc,
  meta,
}) => {
  const filters = defaultFilters?.length < 1 ? null : defaultFilters;
  const orderedTasksListCol = tasksListCol.orderBy("timestamp");
  const taskData = await getDataFromDoc(userDoc, "taskData");
  const { size } = filters
    ? await tasksListCol.where("tags", "array-contains-any", filters).get()
    : await tasksListCol.get();

  const lastSnapshot = meta?.isMoreLoading
    ? filters
      ? lastVisible?.filtered
      : lastVisible?.ordinary
    : true;

  const tasksListCollection = filters
    ? await orderedTasksListCol
        .where("tags", "array-contains-any", filters)
        .startAfter(lastSnapshot)
        .limit(limit)
        .get()
    : await orderedTasksListCol.startAfter(lastSnapshot).limit(limit).get();

  const snapshot =
    tasksListCollection.docs[tasksListCollection.docs.length - 1];
  const LastVisibleObj = filters
    ? { filtered: snapshot }
    : { ordinary: snapshot };

  const data = await tasksListCollection.docs.map((doc) => doc.data());
  const tasksList = data.length > 0 ? data : null;

  return { tasksList, lastVisible: LastVisibleObj, tasksCount: size, taskData };
};
