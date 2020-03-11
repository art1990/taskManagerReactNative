// redux
import { createAction } from "redux-saga-actions";
import actionCreator from "../utils/actionCreator";
// immer
import produce, { Draft } from "immer";

// types
enum Types {
  CREATE = "taskManager/task/create",
  REMOVE = "taskManager/task/remove",
  UPDATE = "taskManager/task/update"
}

// actions
export const create = createAction(Types.CREATE);
export const remove = createAction(Types.REMOVE);
export const update = actionCreator(Types.UPDATE);

//initial state
interface TaskState {
  tasksList: null | [];
  taskData: null | {};
  meta: { isLoading: boolean; error: null | {} };
}

const initialState: TaskState = {
  tasksList: null,
  taskData: null,
  meta: {
    isLoading: false,
    error: null
  }
};

//reducer
export default produce(
  (
    draft: Draft<TaskState> = initialState,
    { type, payload }: { type: string; payload?: any }
  ) => {
    switch (type) {
      default:
        return draft;
    }
  }
);
