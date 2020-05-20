// react
import React, { useCallback } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
// components
import Input from "../../Input";
import Tags from "../../Tags";
// hooks
import useTaskAction from "../../../hooks/useTaskAction";
import useTags from "../../../hooks/useTags";

interface ITagInput {
  tags?: string[];
  style?: {};
}

const TagInput: React.FC<ITagInput> = (props) => {
  const { tags = [], style } = props;
  const { toAddTags } = useTaskAction();
  const { removeTag } = useTags();

  return (
    <>
      <TouchableOpacity testID="toTags" style={[style]} onPress={toAddTags}>
        <Input label="Add tag" disabled />
      </TouchableOpacity>
      <View style={styles.tagsContainer}>
        <Tags tags={tags} removeTag={removeTag} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  tagsContainer: {
    marginTop: 10,
  },
});

export default TagInput;
