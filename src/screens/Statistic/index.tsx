// react
import React from "react";
import { View, Text } from "react-native";
// components
import Title from "../../components/Title";
import WeekChart from "./components/WeekChart";
// hooks
import { useCharts } from "../../hooks/useCharts";
// utils
import { generateWeekForTime, generateWeekForTask } from "../../utils/date";

const Statistic: React.FC = () => {
  const {
    toNextTimeWeek,
    toPrevTimeWeek,
    toNextTaskWeek,
    toPrevTaskWeek,
    loggedTime,
    loggedTasks,
    isLoadingLoggedTime,
    isLoadingLoggedTask,
  } = useCharts();

  const loggedTimeData = loggedTime && generateWeekForTime(loggedTime);
  const loggedTasksData = loggedTasks && generateWeekForTask(loggedTasks);

  return (
    <View>
      <Title text="Statistic" />

      {!isLoadingLoggedTime && loggedTime && (
        <WeekChart
          onNextPress={toNextTimeWeek}
          onPrevPress={toPrevTimeWeek}
          paginationText="hahahah"
          weekData={loggedTimeData}
          suffixY=" H"
        />
      )}
      {!isLoadingLoggedTask && loggedTasks && (
        <WeekChart
          onNextPress={toNextTaskWeek}
          onPrevPress={toPrevTaskWeek}
          paginationText="hahahah"
          weekData={loggedTasksData}
        />
      )}
    </View>
  );
};

export default Statistic;
