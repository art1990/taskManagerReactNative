// react
import React, { useState } from "react";
// hook
import { useFetch } from "../hooks/useFetch";
import useReduxIsloadingListener from "../hooks/redux/useReduxIsloadingListener";
// api
import { getWeekDataApi } from "../services/api/chart";
// serializer
import { conversionToCalendar } from "../utils/conversion";
// utils
import { generateForCalendar } from "../utils/calendar";
import { parse, format } from "date-fns";

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

const dn = new Date();
const dnString = format(dn, "y-LL-dd");

export const useCalendar = (): IUseCalendarReturn => {
  const [date, setDate] = useState({
    string: dnString,
    number: +dn,
  });

  const [sw, setSw] = useState(false);
  useReduxIsloadingListener(setSw);

  const options = {
    currentPerDay: parse(date.string, "yyyy-MM-dd", new Date()),
    sw,
  };

  const { response, error, isLoading } = useFetch(
    getWeekDataApi,
    options,
    conversionToCalendar
  );

  const calendarTasks = response && generateForCalendar(response);

  return { calendarTasks, error, setDate, date, isLoading };
};
