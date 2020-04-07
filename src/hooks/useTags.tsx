// react
import react, { useCallback, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
// react-navigate
import { useNavigation } from "@react-navigation/native";
// redux
import { useDispatch, useSelector } from "react-redux";
import { getTags, updateCurrentTags, updateFilter } from "../redux/task/index";
import { selectTags } from "../redux/task/selectors";
// routes
import { Routes } from "../navigation/routes";

export const useTags = (setValue?: (field: string, value: string) => void) => {
  const dispatch = useDispatch();
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

  useFocusEffect(
    useCallback(() => {
      dispatch(getTags.request());
    }, [getTags])
  );

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
  };
};
