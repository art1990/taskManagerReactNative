// interface
import { IChartsState } from "./";

interface IChartsSelector {
  loggedTime: IChartsState["loggedTime"];
  loggedTasks: IChartsState["loggedTasks"];
  loggedPerDay: IChartsState["loggedPerDay"];
}

export const selectMeta = (state: any): IChartsState["meta"] =>
  state.charts.meta;

export const selectChartsData = (state: any): IChartsSelector => {
  const { loggedTime, loggedTasks, loggedPerDay } = state.charts;

  return { loggedTime, loggedTasks, loggedPerDay };
};
