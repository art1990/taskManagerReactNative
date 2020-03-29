// react
import React, { useCallback } from "react";
import { Text, TouchableOpacity } from "react-native";
// components
import Input from "../../Input";
// hooks
import useTaskAction from "../../../hooks/useTaskAction";

interface ITagInput {
  value?: string[];
}

const TagInput: React.FC<ITagInput> = ({ value: tags = [] }) => {
  const { toAddTags } = useTaskAction();

  return (
    <TouchableOpacity onPress={toAddTags}>
      <Input label="Add tag" disabled />
      {tags.map((el, i) => (
        <Text style={{ backgroundColor: "grey", marginVertical: 10 }} key={i}>
          {el}
        </Text>
      ))}
    </TouchableOpacity>
  );
};

export default TagInput;
