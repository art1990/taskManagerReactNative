// react
import React, { memo } from "react";
import { StyleSheet } from "react-native";
// components
import Header from "./Header";
import Body from "./Body";
import Spinner from "../Spinner";
// hooks
import { useCalendar } from "../../hooks/useCalendar";
import useTaskNavigation from "../../hooks/task/useTaskNavigation";

const Calendar: React.FC = () => {
  const { calendarTasks, setDate, date, isLoading } = useCalendar();
  const { toEdit } = useTaskNavigation();

  return (
    <>
      <Header date={date} setDate={setDate} />
      {isLoading ? (
        <Spinner />
      ) : (
        <Body calendarTasks={calendarTasks} onEditPress={toEdit} />
      )}
    </>
  );
};

const styles = StyleSheet.create({});

export default memo(Calendar);
