// react
import React from "react";
import { View, Text } from "react-native";
// components
import TaskField from "../../../screens/components/TaskField";
import IconButton from "../../../components/IconButton";
// expo icons
import { MaterialIcons } from "@expo/vector-icons";
// styles
import Styles from "../../../assets/styles";
// constants
import { Colors } from "../../../assets/styles/constants";

interface IInfoAndRemoveFile {
  name: string;
  onRemovePress: () => void;
}

const InfoAndRemoveFile: React.FC<IInfoAndRemoveFile> = ({
  name,
  onRemovePress
}) => {
  const size = 20;

  return (
    <View style={Styles.rowSpaceBetween}>
      <TaskField title="Added file" text={name} />
      <IconButton icon="cansel" color={Colors.button} onPress={onRemovePress} />
    </View>
  );
};

export default InfoAndRemoveFile;
