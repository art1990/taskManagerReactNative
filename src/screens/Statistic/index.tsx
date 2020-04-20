// react
import React, { useMemo } from "react";
import { ScrollView, StyleSheet } from "react-native";
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
// assets
import Styles from "../../assets/styles";

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

  const loggedTimeData = useMemo(
    () => loggedTime && generateWeekForTime(loggedTime),
    [loggedTime, generateWeekForTime]
  );
  const loggedTasksData = useMemo(
    () => loggedTasks && generateWeekForTask(loggedTasks),
    [loggedTasks, generateWeekForTask]
  );
  const loggedPerDayData = useMemo(
    () => loggedPerDay && generateForDay(loggedPerDay),
    [loggedPerDay, generateForDay]
  );

  return (
    <ScrollView style={[Styles.wrapper]}>
      <Title text="Statistic" />

      {!isLoadingLoggedTime && loggedTime && (
        <WeekChart
          onNextPress={toNextTimeWeek}
          onPrevPress={toPrevTimeWeek}
          weekData={loggedTimeData}
          suffixY=" H"
          chartName="Logged time"
        />
      )}
      {!isLoadingLoggedTask && loggedTasks && (
        <WeekChart
          onNextPress={toNextTaskWeek}
          onPrevPress={toPrevTaskWeek}
          weekData={loggedTasksData}
          chartName="Logged tasks"
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

const styles = StyleSheet.create({
  container: {},
});

export default Statistic;
