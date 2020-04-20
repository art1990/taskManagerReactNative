// react
import React from "react";
// components
import InputWithIcon from "../../components/InputWithIcon/index";
// types
import { IAddTagInputProps } from "../../types";

const AddTagInput: React.FC<IAddTagInputProps> = ({
  onChangeText,
  value,
  onAddPress,
}) => {
  return (
    <InputWithIcon
      icon="addTag"
      value={value}
      onChangeText={onChangeText}
      label="Add tag"
      onPress={onAddPress}
    />
  );
};

export default AddTagInput;
