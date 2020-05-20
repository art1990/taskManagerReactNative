// react
import React from "react";
// components
import InputWithIcon from "../../components/InputWithIcon/index";
// type
import { typeStyleObj } from "react-native/Libraries/StyleSheet/StyleSheetTypes";

export interface IAddTagInputProps {
  value: string;
  onChangeText: (event: any) => void;
  onAddPress: () => void;
  style: typeStyleObj;
}

const AddTagInput: React.FC<IAddTagInputProps> = ({
  onChangeText,
  value,
  onAddPress,
  style,
}) => {
  return (
    <InputWithIcon
      testID="tagInput"
      inputStyle={style}
      icon="addTag"
      value={value}
      onChangeText={onChangeText}
      label="Add tag"
      onPress={onAddPress}
    />
  );
};

export default AddTagInput;
