// types
import { ITaskState } from "../redux/task";

// charts
export interface IWeekObj {
  id: ITaskState["taskData"]["id"];
  startTaskTime: ITaskState["taskData"]["startTaskTime"];
  duration: ITaskState["taskData"]["duration"];
  endTime: ITaskState["taskData"]["endTime"];
}
