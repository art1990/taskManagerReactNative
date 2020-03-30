// ract
import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
// coponents
import IconButton from "../IconButton";
// constants
import { Colors } from "../../assets/styles/constants";

interface ITag {
  text: string;
  onDeletePress?: () => void;
  style?: {};
  setTags?: any;
}

const Tag: React.FC<ITag> = ({ text, onDeletePress, style, setTags }) => {
  const onAddThisTag = () => {
    setTags(prevTags => [...prevTags, text]);
  };

  return (
    <TouchableOpacity onPress={onAddThisTag} disabled={!setTags}>
      <View style={[styles.container, style]}>
        <Text style={styles.text}>{text}</Text>
        {onDeletePress && (
          <IconButton
            onPress={onDeletePress}
            icon="cansel"
            style={styles.icon}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

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
