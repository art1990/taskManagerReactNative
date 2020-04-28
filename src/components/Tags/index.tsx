// react
import React from "react";
import { StyleSheet, Text, View } from "react-native";
// components
import Tag from "../Tag";

interface ITags {
  tags: string[];
  removeTag?: (i?) => void;
  style?: {} | [];
}

const Tags: React.FC<ITags> = ({ tags, removeTag, style }) => {
  return (
    <View style={[styles.tagsContainer, style]}>
      {tags.map((el, i) => (
        <Tag
          key={el}
          style={styles.tags}
          text={el}
          onDeletePress={removeTag ? () => removeTag(i) : undefined}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tagsContainer: {
    flexDirection: "row",
  },
  tags: {
    marginBottom: 0,
  },
});

export default Tags;
