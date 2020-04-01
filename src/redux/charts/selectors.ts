// interface
import { IChartsState } from "./";

export const selectMeta: (state: any) => IChartsState["meta"] = state =>
  state.charts.meta;
