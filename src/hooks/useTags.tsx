// react
import react, { useCallback, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
// react-navigate
import { useNavigation } from "@react-navigation/native";
// redux
import { useDispatch, useSelector } from "react-redux";
import { getTags, updateCurrentTags } from "../redux/task/index";
import { selectTags } from "../redux/task/selectors";

export const useTags = (setValue?: (field: string, value: string) => void) => {
  const dispatch = useDispatch();
  const { current, all } = useSelector(selectTags);
  const navigation = useNavigation();

  const setTags = (tags = []) => {
    dispatch(updateCurrentTags.run(tags));
  };

  const addTags = tagsData => {
    setTags(tagsData);

    navigation.goBack();
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(getTags.request());
    }, [getTags])
  );

  useEffect(() => {
    setValue && setValue("tags", current);
  }, [current]);

  return { allTags: all, tags: current, setTags, addTags };
};
