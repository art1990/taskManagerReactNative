// utils
import { sleep, random } from "../src/utils/test";

// auth data
const auth = {
  login: "test9999@qq.com",
  password: "111111\n",
};

// task data
const taskData = {
  title: "testtitle" + random(),
  project: "testproject" + random() + "\n",
  tag: "test_tag" + random() + "\n",
};

taskData.titleText = `tit# ${taskData.title} `;

const swipeTask = async () => {
  const task = getTask();
  await task.swipe("left");
};

// helpers
const getById = (id) => element(by.id(id));
const getByText = (text) => element(by.text(text));
// sections
const getTask = () => getById("task").atIndex(0);
const getTaskHeader = () => getById("taskHeader");
const getWorkingTask = () => getById("workingTask");
const getTimeSection = () => getById("timeSection");
// input
const getInputTile = () => getById("title");
const getInputProject = () => getById("project");
const getInputPassword = () => getById("password");
const getInputTag = () => getById("tagInput");
const getInputEmail = () => getById("email");
// button
const getWorkingPauseBtn = () => getById("workingPauseBtn");
const getResumeBtn = () => getById("resumeBtn").atIndex(0);
const getEditBtn = () => getById("editBtn").atIndex(0);
const getRemoveBtn = () => getById("removeBtn").atIndex(0);
const getLoginBtn = () => getByText("Login");
const getAddTaskBtn = () => getById("addTaskBtn");
const getUpdateTaskBtn = () => getByText("Update task");
const getStartTaskBtn = () => getByText("Start task");
const getDoneBtn = () => getByText("Done");
const getBtnToAddTags = () => getById("toTags");
const getIconButton = () => getById("iconButton");
const getAlertConfirm = () => getByText("Remove");

const login = async () => {
  const email = getInputEmail();
  const password = getInputPassword();
  const loginBtn = getLoginBtn();

  await expect(email).toBeVisible();

  await email.replaceText(auth.login);
  await password.typeText(auth.password);
  await loginBtn.tap();
};

const pauseTask = async () => {
  const workingPauseBtn = getWorkingPauseBtn();
  const workingTask = getWorkingTask();
  await expect(workingTask).toBeVisible();
  await workingPauseBtn.tap();
  await sleep(10000);
  await expect(workingTask).toBeNotVisible();
};

const resumeTask = async () => {
  const resumeBtn = getResumeBtn();
  await resumeBtn.tap();
};

const editTask = async () => {
  await swipeTask();
  await sleep(2000);

  const editBtn = getEditBtn();
  await editBtn.tap();

  const title = getInputTile();
  const project = getInputProject();
  await title.typeText(random());
  await project.typeText(random() + "\n");

  const updateTaskBtn = getUpdateTaskBtn();
  const timeSection = getTimeSection();
  await timeSection.swipe("up");
  await sleep(2000);
  await updateTaskBtn.tap();
};

const removeTask = async () => {
  await swipeTask();
  await sleep(2000);

  const removeBtn = getRemoveBtn();
  await removeBtn.tap();
  await sleep(2000);

  const alertconfirmBtn = getAlertConfirm();
  await alertconfirmBtn.tap();
};

describe("Example", () => {
  beforeEach(async () => {
    await device.reloadReactNative();
    await device.setURLBlacklist([".*firestore.googleapis.com.*"]);
  });

  it("should login successfully", async () => {
    await login();
    const taskHeader = getTaskHeader();
    await expect(taskHeader).toBeVisible();
  });
  // it("should task create", async () => {
  //   const addTaskBtn = getAddTaskBtn();

  //   await sleep(10000);
  //   try {
  //     await pauseTask();
  //     await sleep(10000);
  //   } catch (e) {}

  //   await addTaskBtn.tap();

  //   const title = getInputTile();
  //   const project = getInputProject();
  //   const toAddTagsBtn = getBtnToAddTags();

  //   await title.typeText(taskData.title);
  //   await project.typeText(taskData.project);
  //   await toAddTagsBtn.tap();

  //   const tagInput = getInputTag();
  //   const iconButton = getIconButton();
  //   const addTagBtn = getDoneBtn();

  //   await tagInput.typeText(taskData.tag);
  //   await iconButton.tap();
  //   await addTagBtn.tap();

  //   const startTaskBtn = getStartTaskBtn();
  //   await startTaskBtn.tap();
  // });

  // it("should task pause", async () => {
  //   await sleep(10000);
  //   await pauseTask();
  // });

  // it("should resume task", async () => {
  //   await sleep(10000);
  //   await resumeTask();
  // });

  // it("should edit task", async () => {
  //   await sleep(10000);
  //   try {
  //     await pauseTask();
  //   } catch (e) {}
  //   await sleep(10000);
  //   await editTask();
  // });

  it("shold remove task", async () => {
    await sleep(10000);
    await removeTask();
  });
});
