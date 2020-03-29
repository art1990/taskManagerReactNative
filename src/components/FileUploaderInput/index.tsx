// react
import React, { useRef, useState, useEffect } from "react";
import { View, Button, Alert } from "react-native";
// components
import FormInput from "../forms/components/FormInput";
// expo
import * as DocumentPicker from "expo-document-picker";

const FileUploaderInput = ({ onBlur, ...rest }) => {
  const [file, setFile] = useState(null);
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.blur();
  }, [file]);

  const handleOnBlur = () => {
    onBlur(file);
  };

  const onChooseFilePress = async e => {
    const file = await DocumentPicker.getDocumentAsync();

    if (file.type === "success") {
      setFile(file);
      Alert.alert("Success");
    } else {
      Alert.alert("file donot upload");
    }

    inputRef.current.blur();
  };

  return (
    <FormInput
      label="Add file"
      ref={inputRef}
      onFocus={onChooseFilePress}
      onBlur={handleOnBlur}
      {...rest}
    />
  );
};

export default FileUploaderInput;
