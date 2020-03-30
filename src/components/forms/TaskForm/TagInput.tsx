// react
import React, { useCallback } from "react";
import { Text, TouchableOpacity } from "react-native";
// components
import Input from "../../Input";
// hooks
import useTaskAction from "../../../hooks/useTaskAction";

interface ITagInput {
  tags?: string[];
}

const TagInput: React.FC<ITagInput> = props => {
  const { tags = [] } = props;
  const { toAddTags } = useTaskAction();

  return (
    <>
      <TouchableOpacity onPress={toAddTags}>
        <Input label="Add tag" disabled />
      </TouchableOpacity>
      {tags.map((el, i) => (
        <Text style={{ backgroundColor: "grey", marginVertical: 10 }} key={i}>
          {el}
        </Text>
      ))}
    </>
  );
};

export default TagInput;
