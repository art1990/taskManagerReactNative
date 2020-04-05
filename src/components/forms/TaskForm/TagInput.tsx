// react
import React, { useCallback } from "react";
import { Text, TouchableOpacity } from "react-native";
// components
import Input from "../../Input";
import Tag from "../../Tag";
// hooks
import useTaskAction from "../../../hooks/useTaskAction";
// type
import { ITagInput } from "../../../types";

const TagInput: React.FC<ITagInput> = (props) => {
  const { tags = [] } = props;
  const { toAddTags } = useTaskAction();

  return (
    <>
      <TouchableOpacity onPress={toAddTags}>
        <Input label="Add tag" disabled />
      </TouchableOpacity>
      {tags.map((el, i) => (
        <Tag key={i} text={el} />
      ))}
    </>
  );
};

export default TagInput;
