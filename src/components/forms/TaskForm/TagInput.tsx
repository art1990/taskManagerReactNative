// react
import React, { useCallback } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
// components
import Input from "../../Input";
import Tag from "../../Tag";
// hooks
import useTaskAction from "../../../hooks/useTaskAction";
import { useTags } from "../../../hooks/useTags";
// type
import { ITagInput } from "../../../types";

const TagInput: React.FC<ITagInput> = (props) => {
  const { tags = [], style } = props;
  const { toAddTags } = useTaskAction();
  const { removeTag } = useTags();

  return (
    <>
      <TouchableOpacity style={[style]} onPress={toAddTags}>
        <Input label="Add tag" disabled />
      </TouchableOpacity>
      <View style={styles.tagsContainer}>
        {tags.map((el, i) => (
          <Tag key={el} text={el} onDeletePress={() => removeTag(i)} />
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  tagsContainer: {
    flexDirection: "row",
  },
});

export default TagInput;
