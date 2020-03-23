// react
import React from "react";
import { View, Button, Alert } from "react-native";
// components
import FormInput from "../forms/components/FormInput";
// expo
import * as DocumentPicker from "expo-document-picker";

const FileUploaderInput = ({ setFile }) => {
  const onChooseFilePress = async () => {
    const file = await DocumentPicker.getDocumentAsync();

    if (file.type === "success") {
      setFile(file);
      Alert.alert("Success");
    } else {
      Alert.alert("file donot upload");
    }
  };

  return <FormInput label="Add file" onFocus={onChooseFilePress} />;
};

export default FileUploaderInput;
