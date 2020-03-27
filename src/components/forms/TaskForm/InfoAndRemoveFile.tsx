// react
import React from "react";
import { View, Text } from "react-native";
// react-native-papper
import { IconButton } from "react-native-paper";
// components
import TaskField from "../../../screens/components/TaskField";
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
      <IconButton
        icon={() => (
          <MaterialIcons name="cancel" size={size} color={Colors.button} />
        )}
        onPress={onRemovePress}
      />
    </View>
  );
};

export default InfoAndRemoveFile;
