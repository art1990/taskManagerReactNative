// react
import React from "react";
import { StyleSheet, View } from "react-native";
// components
import Tag from "../Tag";
// types
import { typeStyleObj } from "react-native/Libraries/StyleSheet/StyleSheetTypes";

interface ITags {
  tags: string[];
  removeTag?: (i?) => void;
  updateTagFilter?: (i?) => void;
  style?: typeStyleObj;
}

const Tags: React.FC<ITags> = ({ tags, removeTag, updateTagFilter, style }) => {
  const deleteTag = (i) => {
    const filters = tags.slice();
    if (updateTagFilter) {
      filters.splice(i, 1);
      updateTagFilter(filters);
    } else if (removeTag) {
      removeTag(i);
    }
  };

  return (
    <View style={[styles.tagsContainer, style]}>
      {(tags || []).map((el, i) => (
        <Tag
          key={el}
          style={styles.tags}
          text={el}
          onDeletePress={
            updateTagFilter || removeTag ? () => deleteTag(i) : undefined
          }
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: -10,
  },
});

export default Tags;
