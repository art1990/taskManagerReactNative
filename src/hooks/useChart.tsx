// react';
import React, { useState } from "react";
// hooks
import { useFetch } from "../hooks/useFetch";
// api
import { getWeekDataApi } from "../services/api/chart";
// utils
import { getUnixTime } from "date-fns";

export const useChart = (option, conversion?) => {
  const [stateOption, setStateOption] = useState(option);

  const { currentPerDay } = stateOption;

  const { response, error, isLoading } = useFetch(
    getWeekDataApi,
    stateOption,
    conversion
  );

  const lastVisible = response?.lastVisible && {
    lastVisibleRequest: response.lastVisible,
  };

  const toNext = (option) => {
    if (stateOption[option] === response.totalWeeks) return;

    const weekNumber = { [option]: stateOption[option] + 1 };
    setStateOption((prev) => ({
      ...prev,
      ...weekNumber,
      ...lastVisible,
      action: "next",
    }));
  };

  const toPrev = (option) => {
    if (stateOption[option] === 1) return;

    const weekNumber = { [option]: stateOption[option] - 1 };
    setStateOption((prev) => ({
      ...prev,
      ...weekNumber,
      ...lastVisible,
      action: "prev",
    }));
  };

  const { weeksList, startWeek } = response || {};

  const weekData = startWeek &&
    weeksList && {
      weeksList,
      startWeek,
    };

  const toNextTimeWeek = () => toNext("currentWeekTimeNumber");

  const toNextTaskWeek = () => toNext("currentWeekTaskNumber");

  const toPrevTimeWeek = () => toPrev("currentWeekTimeNumber");

  const toPrevTaskWeek = () => toPrev("currentWeekTaskNumber");

  const updatePerDay = (data) => {
    const day = getUnixTime(new Date(data));

    setStateOption((prev) => ({ ...prev, currentPerDay: day }));
  };

  return {
    weekData,
    response,
    isLoading,
    error,
    currentPerDay,
    toNextTaskWeek,
    toNextTimeWeek,
    toPrevTimeWeek,
    toPrevTaskWeek,
    updatePerDay,
  };
};
