// types
import { IUserState } from "./index";

export const selectUser: (state?: {
  user: { user?: {} };
  task: {};
}) => { user?: {} } = (state) => state.user;

export const selectError = (state: { user: IUserState }) => state.user.error;
export const selectLoading = (state: { user: IUserState }) => {
  const { loginning, registering } = state.user;

  return loginning || registering;
};
