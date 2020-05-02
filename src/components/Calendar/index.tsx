// react
import React from "react";
import { StyleSheet } from "react-native";
// components
import Header from "./Header";
import Body from "./Body";
import Spinner from "../Spinner";
// hooks
import { useCalendar } from "../../hooks/useCalendar";
// hooks
import useTaskAction from "../../hooks/useTaskAction";

const Calendar = () => {
  const { calendarTasks, setDate, date, isLoading } = useCalendar();
  const { onEditPress } = useTaskAction();

  return (
    <>
      <Header date={date} setDate={setDate} />
      {isLoading ? (
        <Spinner />
      ) : (
        <Body calendarTasks={calendarTasks} onEditPress={onEditPress} />
      )}
    </>
  );
};

const styles = StyleSheet.create({});

export default Calendar;
