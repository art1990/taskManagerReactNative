// react
import react, { useCallback } from "react";
import { useGlobal } from "reactn";
import { useFocusEffect } from "@react-navigation/native";
// redux
import { useDispatch, useSelector } from "react-redux";
import { getTags } from "../redux/task/index";
import { selectAllTags } from "../redux/task/selectors";

export const useTags = () => {
  const dispatch = useDispatch();
  const allTags = useSelector(selectAllTags);
  const [tags, setTags] = useGlobal<string>("tags");

  useFocusEffect(
    useCallback(() => {
      dispatch(getTags.request());
    }, [getTags])
  );

  return { allTags, tags, setTags };
};
