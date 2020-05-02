// react
import react, { useCallback, useEffect } from "react";
// react-navigate
import { useNavigation } from "@react-navigation/native";
// redux
import { useSelector } from "react-redux";
import { getTags, updateCurrentTags, updateFilter } from "../redux/task";
import { selectTags } from "../redux/task/selectors";
// hook
import useDispatch from "./redux/useDispatch";
// api
import { getTagsApi } from "../services/api/tags";
// routes
import { Routes } from "../navigation/routes";

export default (setValue?: (field: string, value: string) => void) => {
  const { dispatch } = useDispatch();
  const { current, all } = useSelector(selectTags);
  const navigation = useNavigation();

  const setTags = (tags = []) => {
    dispatch(updateCurrentTags.run(tags));
  };

  const addTags = (tagsData) => {
    setTags(tagsData);

    navigation.goBack();
  };

  const removeTag = (index) => {
    setTags(current.filter((_, i) => index !== i) || []);
  };

  const updateTagFilter = (filters = []) => {
    dispatch(updateFilter.run(filters));
    navigation.navigate(Routes.TASKS_LIST);
  };

  const getTagsList = useCallback(() => {
    dispatch(getTags, getTagsApi);
  }, [dispatch]);

  useEffect(() => {
    setValue && setValue("tags", current);
  }, [current]);

  return {
    allTags: all,
    tags: current,
    setTags,
    addTags,
    removeTag,
    updateTagFilter,
    getTagsList,
  };
};
