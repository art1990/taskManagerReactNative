// react
import React from "react";
// react-native-papper
import { IconButton as ICButton } from "react-native-paper";
// icons
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// assets
import Resume from "../../assets/img/icons/resume.svg";
import Edit from "../../assets/img/icons/pencil.svg";
import Remove from "../../assets/img/icons/trash.svg";
// constants
import { Colors } from "../../assets/styles/constants";

interface IResumeIconButton {
  size?: number;
  icon:
    | "edit"
    | "resume"
    | "remove"
    | "pause"
    | "cansel"
    | "addTag"
    | "prev"
    | "next";
  onPress: (id?) => void;
  color?: string;
  style?: {};
}

interface IMaterialIcon {
  name: string;
  color?: string;
  width: number;
  height: number;
}

const MaterialIcon: React.FC<IMaterialIcon> = ({
  name,
  width,
  height,
  color
}) => <MaterialIcons name={name} size={width || height} color={color} />;

const Pause: React.FC<IMaterialIcon> = props => (
  <MaterialIcon name="pause-circle-filled" {...props} />
);

const Cansel: React.FC<IMaterialIcon> = ({ color, ...rest }) => (
  <MaterialIcons name="cancel" color={color || Colors.canselIcon} {...rest} />
);

const AddTag: React.FC<IMaterialIcon> = ({ width, height, color }) => (
  <MaterialCommunityIcons
    name="tag-plus"
    size={width || height}
    color={color || Colors.chartsNav}
  />
);

const Next: React.FC<IMaterialIcon> = ({ color, ...rest }) => (
  <MaterialIcon
    name="navigate-next"
    color={color || Colors.canselIcon}
    {...rest}
  />
);

const Prev: React.FC<IMaterialIcon> = ({ color, ...rest }) => (
  <MaterialIcon
    name="navigate-before"
    color={color || Colors.chartsNav}
    {...rest}
  />
);

const IconButton: React.FC<IResumeIconButton> = ({
  size = 20,
  icon,
  style,
  onPress
}) => {
  const iconComponents = {
    resume: Resume,
    pause: Pause,
    remove: Remove,
    edit: Edit,
    cansel: Cansel,
    addTag: AddTag,
    prev: Prev,
    next: Next
  };

  const Icon = iconComponents[icon];
  const iconSize = icon === "cansel" ? 12 : size;

  return (
    <ICButton
      icon={() => <Icon width={iconSize} heigth={iconSize} />}
      onPress={onPress}
      style={[
        icon === "cansel" && {
          height: iconSize,
          width: iconSize,
          margin: 0
        },
        style
      ]}
    />
  );
};

export default IconButton;
