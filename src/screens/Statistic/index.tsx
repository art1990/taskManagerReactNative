// react
import React from "react";
import { View, Text, ScrollView } from "react-native";
// components
import Title from "../../components/Title";
import WeekChart from "./components/WeekChart";
import PerDayChart from "./components/PerDayChart";
// hooks
import { useCharts } from "../../hooks/useCharts";
// utils
import {
  generateWeekForTime,
  generateWeekForTask,
  generateForDay,
} from "../../utils/date";

const Statistic: React.FC = () => {
  const {
    toNextTimeWeek,
    toPrevTimeWeek,
    toNextTaskWeek,
    toPrevTaskWeek,
    updatePerDay,
    currentPerDay,
    loggedTime,
    loggedTasks,
    loggedPerDay,
    isLoadingLoggedTime,
    isLoadingLoggedTask,
    isLoadingLoggedPerDay,
  } = useCharts();

  const loggedTimeData = loggedTime && generateWeekForTime(loggedTime);
  const loggedTasksData = loggedTasks && generateWeekForTask(loggedTasks);
  const loggedPerDayData = loggedPerDay && generateForDay(loggedPerDay);

  return (
    <ScrollView>
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
      {!isLoadingLoggedPerDay && loggedPerDay && (
        <PerDayChart
          dayData={loggedPerDayData}
          updateDate={updatePerDay}
          currentDate={currentPerDay}
        />
      )}
    </ScrollView>
  );
};

export default Statistic;
