// react
import React, { useMemo } from "react";
import { StyleSheet } from "react-native";
// components
import PerDayChart from "./components/PerDayChart";
import Spinner from "../../components/Spinner";
// hooks
import { useChart } from "../../hooks/useChart";
// utils
import { generateForDay } from "../../utils/charts";
import { conversionToLoggedPerDay } from "../../utils/conversion";
import { getUnixTime } from "date-fns";

const LoggedPerDay = () => {
  const { isLoading, response, updatePerDay, currentPerDay } = useChart(
    {
      currentPerDay: getUnixTime(new Date()),
    },
    conversionToLoggedPerDay
  );

  const { tasksList, currentDay } = response || {};

  const weekData = tasksList && currentDay && { tasksList, currentDay };

  const chartData = useMemo(() => weekData && generateForDay(weekData), [
    weekData,
    generateForDay,
  ]);

  return (
    <>
      {isLoading ? (
        <Spinner isChart />
      ) : (
        weekData && (
          <PerDayChart
            inputStyle={styles.input}
            dayData={chartData}
            updateDate={updatePerDay}
            currentDate={currentPerDay}
            chartName="Logged per day"
          />
        )
      )}
    </>
  );
};

const styles = StyleSheet.create({
  input: { marginLeft: 26 },
});

export default LoggedPerDay;
