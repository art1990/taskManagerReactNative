// react
import React, { useState, useEffect } from "react";
// redux
import { useDispatch, useSelector } from "react-redux";
// hook
import { useFetch } from "../hooks/useFetch";
// api
import { getWeekDataApi } from "../services/api";
// serializer
import { conversionToCalendar } from "../utils/conversion";
// utils
import { generateForCalendar } from "../utils/calendar";
import { getUnixTime, parse } from "date-fns";

export const useCalendar = () => {
  const [date, setDate] = useState({
    string: "2020-04-25",
    number: 1587632990375,
  });

  const { response, error, isLoading } = useFetch(
    getWeekDataApi,
    {
      currentPerDay: parse(date.string, "yyyy-MM-dd", new Date()),
    },
    conversionToCalendar
  );

  const calendarTasks = response && generateForCalendar(response);

  return { calendarTasks, error, setDate, date, isLoading };
};
