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
// types
import { IMaterialIconProps, IIconButtonProps } from "../../types";

const MaterialIcon: React.FC<IMaterialIconProps> = ({
  name,
  width,
  height,
  color,
}) => <MaterialIcons name={name} size={width || height} color={color} />;

const Pause: React.FC<IMaterialIconProps> = (props) => (
  <MaterialIcon name="pause-circle-filled" {...props} />
);

const Cansel: React.FC<IMaterialIconProps> = ({ color, ...rest }) => (
  <MaterialIcons name="cancel" color={color || Colors.canselIcon} {...rest} />
);

const AddTag: React.FC<IMaterialIconProps> = ({ width, height, color }) => (
  <MaterialCommunityIcons
    name="tag-plus"
    size={width || height}
    color={color || Colors.chartsNav}
  />
);

const Next: React.FC<IMaterialIconProps> = ({ color, ...rest }) => (
  <MaterialIcon
    name="navigate-next"
    color={color || Colors.chartsNav}
    {...rest}
  />
);

const Prev: React.FC<IMaterialIconProps> = ({ color, ...rest }) => (
  <MaterialIcon
    name="navigate-before"
    color={color || Colors.chartsNav}
    {...rest}
  />
);

const Filter: React.FC<IMaterialIconProps> = ({ color, ...rest }) => (
  <MaterialIcon name="filter-list" color={color} {...rest} />
);

const Calendar: React.FC<IMaterialIconProps> = ({ width, height, color }) => (
  <MaterialCommunityIcons
    name="calendar-text"
    size={width || height}
    color={color || Colors.black}
  />
);

const IconButton: React.FC<IIconButtonProps> = ({
  size = 20,
  icon,
  style,
  color,
  onPress,
  ...rest
}) => {
  const iconComponents = {
    resume: Resume,
    pause: Pause,
    remove: Remove,
    edit: Edit,
    cansel: Cansel,
    addTag: AddTag,
    prev: Prev,
    next: Next,
    filter: Filter,
    calendar: Calendar,
  };

  const Icon = iconComponents[icon];
  const iconSize = icon === "cansel" ? 12 : size;

  return (
    <ICButton
      {...rest}
      icon={() => <Icon width={iconSize} heigth={iconSize} color={color} />}
      onPress={onPress}
      style={[
        ["cansel", "prev", "next"].indexOf(icon) !== -1 && {
          height: iconSize,
          width: iconSize,
          margin: 0,
        },
        style,
      ]}
    />
  );
};

export default IconButton;
