// react
import React, { useCallback, useEffect } from "react";
import { View, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
// redux
import { useDispatch, useSelector } from "react-redux";
import { logout, initialize } from "../../redux/user";
import { add, remove, getIncomplete, getList } from "../../redux/task";
import { selectTaskData, selectTasksList } from "../../redux/task/selectors";
// components
import Button from "../../components/Button";
import TaskInfo from "../../components/TaskInfo";
import WorkingTaskInfo from "../../components/WorkingTaskInfo";
import Title from "../../components/Title";
// hooks
import { useAuth } from "../../hooks/useAuth";
// constants
import { Routes } from "../../navigation/routes";
import { Colors } from "../../assets/styles/constants";

export default ({ navigation }) => {
  const { user } = useAuth();
  const taskData = useSelector(selectTaskData) || {};
  const tasksList = useSelector(selectTasksList);

  const dispatch = useDispatch();

  useEffect(() => {
    user && dispatch(initialize.run(user));
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      if (!user) return;
      dispatch(getIncomplete.request());
      dispatch(getList.request());
    }, [user])
  );

  const onLogOut = () => {
    dispatch(logout.run());
  };

  const onCreateTask = () => {
    dispatch(add.request(taskData));
  };

  const onRemovePress = (id, uri) => {
    dispatch(remove.request({ id, uri }));
  };

  const onEditPress = id => {
    navigation.navigate(Routes.EDIT_TASK, { id });
  };

  const toAddTask = () => {
    navigation.navigate(Routes.CREATE_TASK);
  };

  const { startTime, title } = taskData;
  return (
    <View>
      <Title text="Tasks" buttonText="Log out" buttonAction={onLogOut} />
      {tasksList?.map(({ title, project, duration, id, file }, i) => (
        <TaskInfo
          key={id}
          title={title}
          project={project}
          duration={duration}
          background={!(i % 2) && Colors.taskInfoBGColor}
          onRemovePress={() => {
            onRemovePress(id, file?.uri);
          }}
          onEditPress={() => {
            onEditPress(id);
          }}
        />
      ))}
      {startTime ? (
        <WorkingTaskInfo
          title={title}
          startTime={startTime}
          onCreateTask={onCreateTask}
        />
      ) : (
        <Button onPress={toAddTask}>Add task</Button>
      )}
    </View>
  );
};
