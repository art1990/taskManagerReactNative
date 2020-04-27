// react
import React from "react";
import { StyleSheet, Text, View } from "react-native";
// components
import Header from "./Header";
import Body from "./Body";
import Spinner from "../Spinner";
// hooks
import { useCalendar } from "../../hooks/useCalendar";

const Calendar = () => {
  const { calendarTask, setDate, date, isLoading } = useCalendar();

  return (
    <>
      <Header date={date} setDate={setDate} />
      {isLoading ? <Spinner /> : <Body />}
    </>
  );
};

const styles = StyleSheet.create({});

export default Calendar;
