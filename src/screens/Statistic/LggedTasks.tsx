// react
import React, { useMemo } from "react";
// components
import WeekChart from "./components/WeekChart";
import Spinner from "../../components/Spinner";

// hooks
import { useChart } from "../../hooks/useChart";
// utils
import { generateWeekForTask } from "../../utils/charts";

const LoggedTasks = () => {
  const { isLoading, weekData, toNextTaskWeek, toPrevTaskWeek } = useChart({
    currentWeekTaskNumber: 1,
  });

  const chartData = useMemo(() => weekData && generateWeekForTask(weekData), [
    weekData,
    generateWeekForTask,
  ]);

  return (
    <>
      {isLoading ? (
        <Spinner isChart />
      ) : (
        weekData && (
          <WeekChart
            onNextPress={toNextTaskWeek}
            onPrevPress={toPrevTaskWeek}
            weekData={chartData}
            chartName="Logged tasks"
          />
        )
      )}
    </>
  );
};

export default LoggedTasks;
