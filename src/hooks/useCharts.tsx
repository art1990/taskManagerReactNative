// react
import react, { useCallback, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
// redux
import { useDispatch, useSelector } from "react-redux";
import {
  getLoggedTime,
  getLoggedTasks,
  getLoggedPerDay,
  updateMeta
} from "../redux/charts";
import { selectMeta, selectChartsData } from "../redux/charts/selectors";

interface ICharts {
  currentWeekTimeNumber: number;
  currentWeekTaskNumber: number;
  loggedTime: [];
  isLoadingLoggedTime: boolean;
  toNextTaskWeek: () => void;
  toNextTimeWeek: () => void;
  toPrevTimeWeek: () => void;
  toPrevTaskWeek: () => void;
}

export const useCharts = (): ICharts => {
  const dispatch = useDispatch();
  const {
    currentWeekTimeNumber,
    currentWeekTaskNumber,
    totalWeeks,
    isLoadingLoggedTime
  } = useSelector(selectMeta);

  const { loggedTime } = useSelector(selectChartsData);

  useFocusEffect(
    useCallback(() => {
      dispatch(getLoggedTime.request({ currentWeekTimeNumber }));
    }, [getLoggedTime, currentWeekTimeNumber])
  );

  useFocusEffect(
    useCallback(() => {
      dispatch(getLoggedTasks.request({ currentWeekTaskNumber }));
    }, [getLoggedTasks, currentWeekTaskNumber])
  );

  const toNextTimeWeek = () => {
    if (currentWeekTimeNumber === totalWeeks) return;

    const weekNumber = { currentWeekTimeNumber: currentWeekTimeNumber + 1 };
    dispatch(updateMeta.run({ ...weekNumber, action: "next" }));
  };

  const toNextTaskWeek = () => {
    if (currentWeekTaskNumber === totalWeeks) return;

    const weekNumber = { currentWeekTaskNumber: currentWeekTaskNumber + 1 };
    dispatch(updateMeta.run({ ...weekNumber, action: "next" }));
  };

  const toPrevTimeWeek = () => {
    if (currentWeekTimeNumber === 1) return;

    const weekNumber = { currentWeekTimeNumber: currentWeekTimeNumber - 1 };
    dispatch(updateMeta.run({ ...weekNumber, action: "prev" }));
  };

  const toPrevTaskWeek = () => {
    if (currentWeekTaskNumber === 1) return;

    const weekNumber = { currentWeekTaskNumber: currentWeekTaskNumber - 1 };
    dispatch(updateMeta.run({ ...weekNumber, action: "prev" }));
  };

  return {
    currentWeekTimeNumber,
    currentWeekTaskNumber,
    loggedTime,
    isLoadingLoggedTime,
    toNextTaskWeek,
    toNextTimeWeek,
    toPrevTimeWeek,
    toPrevTaskWeek
  };
};
