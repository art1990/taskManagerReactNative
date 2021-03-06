// react
import React, { useCallback, useMemo } from "react";
import { StyleSheet, ScrollView } from "react-native";
// components
import CaruselTask from "./CaruselTask";
// colors
import { Colors } from "../../../assets/styles/constants";
// utils
import { generateHourList } from "../../../utils/time";
// types
import { IUseCalendarReturn } from "../../../hooks/useCalendar";

interface IBodyProps {
  calendarTasks: IUseCalendarReturn["calendarTasks"];
  onEditPress: () => void;
}

const Body: React.FC<IBodyProps> = ({ calendarTasks, onEditPress }) => {
  const hourList = useMemo(
    () => calendarTasks && generateHourList(calendarTasks),
    [calendarTasks, generateHourList]
  );

  const generateTasks = useCallback(() => {
    return hourList?.map(([hour, tasksList], i) => (
      <CaruselTask
        onEditPress={onEditPress}
        key={i}
        data={tasksList}
        hour={hour}
        style={[
          i === 0
            ? { height: 60 * 12 }
            : {
                position: "absolute",
                top: i * 60,
                left: 0,
                flex: 1,
                height: 60 * (12 - i),
                zIndex: i,
              },
        ]}
      />
    ));
  }, [hourList, onEditPress]);

  return (
    <ScrollView style={styles.container}>
      <>{generateTasks()}</>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    flexDirection: "column",
    marginLeft: 20,
    marginRight: 28,
    marginVertical: 10,
    borderLeftWidth: 1,
    borderColor: Colors.calendarLabel,
  },
  tasksContainer: {
    backgroundColor: "transparent",
    borderColor: "black",
    borderWidth: 1,
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
  },
});

export default Body;
