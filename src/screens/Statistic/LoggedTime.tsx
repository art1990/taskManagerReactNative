// react
import React, { useMemo } from "react";
// components
import WeekChart from "./components/WeekChart";
import Spinner from "../../components/Spinner";
// hooks
import { useChart } from "../../hooks/useChart";
// utils
import { generateWeekForTime } from "../../utils/charts";

const LoggedTime = () => {
  const { isLoading, weekData, toNextTimeWeek, toPrevTimeWeek } = useChart({
    currentWeekTimeNumber: 1,
  });

  const chartData = useMemo(() => weekData && generateWeekForTime(weekData), [
    weekData,
    generateWeekForTime,
  ]);

  return (
    <>
      {isLoading ? (
        <Spinner isChart />
      ) : (
        weekData && (
          <WeekChart
            onNextPress={toNextTimeWeek}
            onPrevPress={toPrevTimeWeek}
            weekData={chartData}
            suffixY=" H"
            chartName="Logged time"
          />
        )
      )}
    </>
  );
};

export default LoggedTime;
