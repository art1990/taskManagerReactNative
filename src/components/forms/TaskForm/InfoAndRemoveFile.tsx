// react
import React from "react";
import { View, Text, StyleSheet } from "react-native";
// react-native-papper
import { IconButton } from "react-native-paper";
// expo icons
import { MaterialIcons } from "@expo/vector-icons";
// styles
import Styles from "../../../assets/styles";

interface IInfoAndRemoveFile {
  name: string;
  onRemovePress: () => void;
}

const InfoAndRemoveFile: React.FC<IInfoAndRemoveFile> = ({
  name,
  onRemovePress
}) => (
  <View style={Styles.rowSpaceBetween}>
    <Text>{name}</Text>
    <IconButton
      icon={() => <MaterialIcons name="cancel" />}
      onPress={onRemovePress}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: "row"
  }
});

export default InfoAndRemoveFile;
