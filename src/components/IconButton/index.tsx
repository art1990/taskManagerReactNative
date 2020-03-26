// react
import React from "react";
// react-native-papper
import { IconButton as Button } from "react-native-paper";
// icons
import { MaterialIcons } from "@expo/vector-icons";
// assets
import Resume from "../../assets/img/icons/resume.svg";
import Edit from "../../assets/img/icons/pencil.svg";
import Remove from "../../assets/img/icons/trash.svg";

interface IResumeIconButton {
  size?: number;
  icon: "edit" | "resume" | "remove" | "pause";
  onPress: (id?) => void;
}

const Pause: React.FC<{ width: number; height: number }> = ({
  width,
  height
}) => <MaterialIcons name="pause-circle-filled" size={width || height} />;

const IconButton: React.FC<IResumeIconButton> = ({
  size = 22,
  icon,
  onPress
}) => {
  const iconComponents = {
    resume: Resume,
    pause: Pause,
    remove: Remove,
    edit: Edit
  };

  const Icon = iconComponents[icon];
  return (
    <Button
      icon={() => <Icon width={size} heigth={size} />}
      onPress={onPress}
    />
  );
};

export default IconButton;
