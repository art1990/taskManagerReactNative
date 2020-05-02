// react
import React from "react";
import { StyleSheet, FlatList } from "react-native";
// components
import TaskInfo from "../../components/TaskInfo";
import TaskSwipeableInfo from "./TaskSwipeableInfo";
// hook
import useTaskNavigation from "../../hooks/task/useTaskNavigation";
// colors
import { Colors } from "../../assets/styles/constants";
// assets
import Styles from "../../assets/styles";
// interface
import { ITaskState } from "../../redux/task";

const CustomFlatList = ({
  renderFooter,
  loadMore,
  tasksList,
  onRemovePress,
  onResumePress,
  taskDataId,
}) => {
  const { toView, toEdit } = useTaskNavigation();

  return (
    <FlatList
      style={Styles.fullScreen}
      data={tasksList}
      keyExtractor={(item) => item.id}
      onEndReached={loadMore}
      bounces={false}
      onEndReachedThreshold={0.001}
      ListFooterComponent={renderFooter}
      renderItem={(el: { item: ITaskState["taskData"] }) => {
        const {
          title,
          project,
          duration,
          startTaskTime,
          isPaused,
          isCompleted,
          id,
        } = el.item;

        if (taskDataId === id) {
          const props = {
            title,
            project,
            startTaskTime,
            isPaused,
            style: { backgroundColor: Colors.taskInfoBGColorActive },
          };
          return <TaskInfo {...props} />;
        }

        const props = {
          title,
          project,
          duration,
          isPaused,
          isCompleted,
        };

        return (
          <TaskSwipeableInfo
            key={id}
            {...props}
            onRemovePress={() => {
              onRemovePress(id);
            }}
            onEditPress={() => {
              toEdit(id);
            }}
            onResumePress={() => onResumePress(el.item)}
            toView={() => toView(id)}
          />
        );
      }}
    />
  );
};

export default CustomFlatList;
