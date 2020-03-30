// ract
import React from "react";
import { Text, View, StyleSheet } from "react-native";
// coponents
import IconButton from "../IconButton";
// constants
import { Colors } from "../../assets/styles/constants";

interface ITag {
  text: string;
  onDeletePress?: () => void;
  style?: {};
}

const Tag: React.FC<ITag> = ({ text, onDeletePress, style }) => (
  <View style={[styles.container, style]}>
    <Text style={styles.text}>{text}</Text>
    {onDeletePress && (
      <IconButton onPress={onDeletePress} icon="cansel" style={styles.icon} />
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: "row",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.taskInfoBGColor,
    borderRadius: 15
  },
  text: {
    fontSize: 14,
    lineHeight: 21
  },
  icon: {
    marginLeft: 12
  }
});

export default Tag;
