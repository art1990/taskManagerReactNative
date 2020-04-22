// react
import React, { useMemo } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
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
import { Colors } from "../../assets/styles/constants";

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
    <View style={[styles.container]}>
      <ScrollView>
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
            inputStyle={styles.input}
            dayData={loggedPerDayData}
            updateDate={updatePerDay}
            currentDate={currentPerDay}
            chartName="Logged per day"
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
    backgroundColor: Colors.white,
    paddingLeft: 8,
    paddingRight: 30,
  },
  input: { marginLeft: 26 },
});

export default Statistic;
