// react
import React, { useCallback } from "react";
import { View, StyleSheet } from "react-native";
// redux
import { useSelector } from "react-redux";
import {
  selectTaskData,
  selectTasksList,
  selectMeta,
} from "../../redux/task/selectors";
// components
import Button from "../../components/Button";
import WorkingTaskInfo from "../../components/WorkingTaskInfo";
import TitleWithFilter from "../sections/TitleWithFilter";
import GenerateListOfTask from "./GenerateListOfTask";
import Spinner from "../../components/Spinner";
import FlatList from "./FlatList";
import Tags from "../../components/Tags";
// hooks
import useIsMounted from "../../hooks/useIsMounted";
import useUpdateTask from "../../hooks/task/useUpdateTask";
import { useFetchTaskData } from "../../hooks/task/useFetchTaskData";
import useRemoveTask from "../../hooks/task/useRemoveTask";
import useUser from "../../hooks/useUser";
import useTaskNavigation from "../../hooks/task/useTaskNavigation";
import useListener from "../../hooks/db/useListener";
import useTags from "../../hooks/useTags";
// utils
import { isEmpty } from "../../utils/array";
// styles
import Styles from "../../assets/styles";

export default () => {
  const taskData = useSelector(selectTaskData);
  const tasksList = useSelector(selectTasksList);
  const { isLoading, filters, isMoreLoading, tasksCount } = useSelector(
    selectMeta
  );
  const { onLogoutPress } = useUser();
  const { onResumePress, onPausePress } = useUpdateTask();
  const { onRemovePress } = useRemoveTask();
  const { getTasksList, resetTaskData } = useFetchTaskData();
  const { toAddTask, toView, toFilters } = useTaskNavigation();
  const isMounted = useIsMounted();
  const { updateTagFilter } = useTags();
  useListener(getTasksList, filters, resetTaskData);

  const loadMore = useCallback(() => {
    if (tasksList.length >= tasksCount || isMoreLoading) return;
    getTasksList({ isMoreLoading: true });
  }, [tasksList, tasksCount, getTasksList]);

  const renderFooter = useCallback(() => (isMoreLoading ? <Spinner /> : null), [
    isMoreLoading,
  ]);

  const isLoader = isLoading || !isMounted;
  const { startTime, duration, title } = taskData;
  return (
    <View
      testID="taskHeader"
      style={[
        Styles.wrapper,
        styles.container,
        isEmpty(tasksList) && Styles.columnSpaceBetween,
      ]}
    >
      <TitleWithFilter
        text="Tasks"
        buttonText="Log out"
        buttonAction={onLogoutPress}
        onPressFilter={toFilters}
        onPressClearFilter={updateTagFilter}
        isHasTag={filters?.length > 0}
      />
      <Tags tags={filters} updateTagFilter={updateTagFilter} />
      {isLoader ? (
        <Spinner />
      ) : !isEmpty(tasksList) ? (
        <>
          <FlatList
            renderFooter={renderFooter}
            loadMore={loadMore}
            tasksList={tasksList}
            taskDataId={taskData?.id}
            onRemovePress={onRemovePress}
            onResumePress={onResumePress}
          />
          {startTime ? (
            <WorkingTaskInfo
              title={title}
              startTime={startTime}
              duration={duration}
              onCreateTask={onPausePress}
              toView={() => toView(taskData.id)}
            />
          ) : (
            <Button testID="addTaskBtn" onPress={toAddTask}>
              Add task
            </Button>
          )}
        </>
      ) : (
        <>
          <GenerateListOfTask />
          <Button testID="addTaskBtn" onPress={toAddTask}>
            Add task
          </Button>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
