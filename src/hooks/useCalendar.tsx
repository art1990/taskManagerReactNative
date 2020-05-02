// react
import React, { useState } from "react";
// hook
import { useFetch } from "../hooks/useFetch";
// api
import { getWeekDataApi } from "../services/api/chart";
// serializer
import { conversionToCalendar } from "../utils/conversion";
// utils
import { generateForCalendar } from "../utils/calendar";
import { parse } from "date-fns";

export interface IUseCalendarReturn {
  calendarTasks: {}[];
  error: any;
  setDate: React.Dispatch<
    React.SetStateAction<{
      string: string;
      number: number;
    }>
  >;
  date: {
    string: string;
    number: number;
  };
  isLoading: boolean;
}

export const useCalendar = (): IUseCalendarReturn => {
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
