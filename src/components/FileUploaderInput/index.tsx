// react
import React from "react";
import { View, Button, Alert } from "react-native";
// expo
import * as DocumentPicker from "expo-document-picker";
// firebase
import { storage } from "../../fireBase";

const FileUploaderInput = ({ setFile }) => {
  const uploadFile = async (uri, fileName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = storage.ref().child("file/" + fileName);
    return ref.put(blob);
  };

  const onChooseFilePress = async () => {
    const file = await DocumentPicker.getDocumentAsync();

    if (file.type === "success") {
      setFile(file);
      Alert.alert("Success");
    } else {
      Alert.alert("file donot upload");
    }

    // if (type === "success") {
    //   uploadFile(uri, name)
    //     .then(() => {
    //       Alert.alert("Success");
    //     })
    //     .catch(error => {
    //       Alert.alert(error);
    //     });
    // }
  };

  return (
    <View>
      <Button title="Choose file" onPress={onChooseFilePress} />
    </View>
  );
};

export default FileUploaderInput;
