// react
import React from "react";
// react-native-papper
import { IconButton as ICButton } from "react-native-paper";
// icons
import { MaterialIcons } from "@expo/vector-icons";
// assets
import Resume from "../../assets/img/icons/resume.svg";
import Edit from "../../assets/img/icons/pencil.svg";
import Remove from "../../assets/img/icons/trash.svg";
// constants
import { Colors } from "../../assets/styles/constants";

interface IResumeIconButton {
  size?: number;
  icon: "edit" | "resume" | "remove" | "pause" | "cansel";
  onPress: (id?) => void;
  color?: string;
}

const Pause: React.FC<{ width: number; height: number }> = ({
  width,
  height
}) => <MaterialIcons name="pause-circle-filled" size={width || height} />;

const Cansel: React.FC<{ width: number; height: number; color?: string }> = ({
  width,
  height,
  color
}) => (
  <MaterialIcons
    name="cancel"
    size={width || height}
    color={color || Colors.canselIcon}
  />
);

const IconButton: React.FC<IResumeIconButton> = ({
  size = 14,
  icon,
  onPress
}) => {
  const iconComponents = {
    resume: Resume,
    pause: Pause,
    remove: Remove,
    edit: Edit,
    cansel: Cansel
  };

  const Icon = iconComponents[icon];
  return (
    <ICButton
      icon={() => <Icon width={size} heigth={size} />}
      onPress={onPress}
      style={[icon === "cansel" && { height: size, width: size, margin: 0 }]}
    />
  );
};

export default IconButton;
