// react
import React, { useEffect } from "react";
// redux
import { useSelector } from "react-redux";
import { getList, reset } from "../../redux/task";
import { selectMeta } from "../../redux/task/selectors";
// api
import { getTaskListApi } from "../../services/api/task";
// hook
import useDispatch from "../redux/useDispatch";

export const useFetchTaskData = () => {
  const { dispatch } = useDispatch();
  const { filters, limit, lastVisible } = useSelector(selectMeta);

  const getTasksList = (meta = undefined) => {
    const params = {
      filters,
      limit,
      lastVisible,
      meta,
    };

    dispatch(getList, getTaskListApi, params);
  };

  const resetTaskData = () => dispatch(reset.run());

  return { getTasksList, resetTaskData };
};
