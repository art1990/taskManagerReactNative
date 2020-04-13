// react
import React, { ReactElement } from "react";
import { KeyboardTypeOptions } from "react-native";
// types
import { ITaskState } from "../redux/task";

// components
export interface IButtonProps {
  onPress: () => void;
  children: string;
  color?: string;
  labelStyle?: {};
  style?: {};
  mode?: any;
}

export interface IIconButtonProps {
  size?: number;
  icon:
    | "edit"
    | "resume"
    | "remove"
    | "pause"
    | "cansel"
    | "addTag"
    | "prev"
    | "next"
    | "filter";
  onPress: (id?) => void;
  color?: string;
  style?: {};
}

export interface IMaterialIconProps {
  name: string;
  color?: string;
  width: number;
  height: number;
}

export interface IInputProps {
  style?: {};
  name: string;
  value: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  label?: string;
  placeholder?: string;
  placeholderColor?: string;
  keyboardType?: KeyboardTypeOptions;
}

export interface IWeekData {
  data: number[];
  labels: string[];
}

export interface IWeeksListProps {
  weeksList?: {
    startTaskTime: number;
    duration: number;
    id: string;
    endTime: number;
    timeInterval: { startTime: number; endTime: number }[];
  }[];
  weekData: IWeekData;
  suffixY?: string;
}

export interface INavigationMessage {
  text: string;
  buttonText: string;
  goTo: () => void;
}

export interface IPasswordInputProps extends IInputProps {
  iconSize?: number;
  isError?: boolean;
  style?: {};
}

export interface ITagProps {
  text: string;
  onDeletePress?: () => void;
  style?: {};
  setTags?: any;
}

export interface ITaskInfoProps {
  title: string;
  project: string;
  isPaused: boolean;
  duration?: number;
  startTaskTime?: number;
  isCompleted?: boolean;
  onResumePress?: () => void;
  toView?: () => void;
  style?: {};
}

export interface ITimerProps {
  startTime: number;
  duration: number;
}

export interface ITitleProps {
  text: string;
  buttonText?: string;
  style?: {};
  buttonAction?: () => void;
  iconButtonList?: JSX.Element[];
  isCompleted?: boolean;
  children?: any;
}

export interface IWorkingTaskInfoProps {
  title: string;
  startTime: number;
  duration: number;
  onCreateTask: () => void;
  style?: {};
}

// forms
export interface IAuthForm {
  onSubmit: any;
  style?: {};
}

export interface ILoginFormData {
  email: string;
  password: string;
}

export interface ISignUpFormData extends ILoginFormData {
  passwordConfirm: string;
}

export interface ITaskForm {
  onSubmit: any;
  isEditing?: boolean;
  formData?: TaskFormData;
  style?: {};
  children?: ReactElement;
}

type TaskFormData = {
  file: {};
  defaultValues: {};
};

export interface IInfoAndRemoveFile {
  name: string;
  onRemovePress: () => void;
}

export interface ITagInput {
  tags?: string[];
  style?: {};
}

// screens
export interface IAddTagInputProps {
  value: string;
  onChangeText: (event: any) => void;
  onAddPress: () => void;
}

export interface ILoginProps {
  navigation: any;
}

export interface ITagViewProps {
  allTags: string[];
  initialTags: string[];
  Input?: React.FC<any>;
  buttonText: string;
  buttonAction: (arr: string[]) => void;
}

export interface ITaskFieldProps {
  title: string;
  text: string | number;
  isTime?: boolean;
}

export interface ICreateTaskProps {
  navigation: any;
}

//sections
export interface ITimeSectionProps {
  startTaskTime: number;
  endTime: number;
  duration: number;
}

export interface ITitleWithFilterProps extends ITitleProps {
  onPressFilter?: () => void;
  isHasTag: boolean;
}

export interface IPaginatorProps {
  text: string;
  onNextPress: () => void;
  onPrevPress: () => void;
}

export interface IWeekChartProps {
  onNextPress: () => void;
  onPrevPress: () => void;
  paginationText: string;
  suffixY?: string;
  weekData: { data: number[]; labels: string[] };
}

export interface ITaskSwipeableInfoProps extends ITaskInfoProps {
  onRemovePress: () => void;
  onEditPress: () => void;
  onResumePress: () => void;
}

export interface ITaskViewProps {
  task: any;
  route: any;
  navigation: any;
}

// utils
export interface ITask {
  id: ITaskState["taskData"]["id"];
  title: ITaskState["taskData"]["title"];
  project: ITaskState["taskData"]["project"];
  isCompleted: ITaskState["taskData"]["isCompleted"];
  isPaused: ITaskState["taskData"]["isPaused"];
  file: ITaskState["taskData"]["file"];
  tags: ITaskState["tags"]["all"];
  duration: ITaskState["taskData"]["duration"];
  startTaskTime: ITaskState["taskData"]["startTaskTime"];
  startTime: ITaskState["taskData"]["startTime"];
  endTime: ITaskState["taskData"]["endTime"];
  timeInterval: ITaskState["taskData"]["timeInterval"];
  timestamp: any;
}
