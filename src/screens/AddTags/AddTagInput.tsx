// react
import React from "react";
// components
import InputWithIcon from "../../components/InputWithIcon/index";

export interface IAddTagInputProps {
  value: string;
  onChangeText: (event: any) => void;
  onAddPress: () => void;
}

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
