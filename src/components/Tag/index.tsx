// ract
import React, { Dispatch } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
// coponents
import IconButton from "../IconButton";
// constants
import { Colors } from "../../assets/styles/constants";
// types
import { typeStyleObj } from "react-native/Libraries/StyleSheet/StyleSheetTypes";

interface ITagProps {
  text: string;
  onDeletePress?: () => void;
  style?: typeStyleObj;
  setTags?: React.Dispatch<React.SetStateAction<string[]>>;
}

const Tag: React.FC<ITagProps> = ({ text, onDeletePress, style, setTags }) => {
  const onAddThisTag = () => {
    setTags((prevTags) => [...(prevTags || []), text]);
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
    marginHorizontal: 8,
    marginVertical: 18,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.taskInfoBGColor,
    borderRadius: 15,
  },
  text: {
    fontSize: 14,
    lineHeight: 21,
  },
  icon: {
    marginLeft: 12,
  },
});

export default Tag;
