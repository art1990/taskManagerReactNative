// react
import React from "react";
import { View, Button, Alert } from "react-native";
// expo
import * as DocumentPicker from "expo-document-picker";

// firebase
import { storage } from "../../fireBase";

const FileUploaderInput = () => {
  const uploadFile = async (uri, fileName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = storage.ref().child("file/" + fileName);
    return ref.put(blob);
  };

  const onChooseFilePress = async () => {
    let { type, name, uri } = await DocumentPicker.getDocumentAsync();

    if (type === "success") {
      uploadFile(uri, name)
        .then(() => {
          Alert.alert("Success");
        })
        .catch(error => {
          Alert.alert(error);
        });
    }
  };

  return (
    <View>
      <Button title="Choose file" onPress={onChooseFilePress} />
    </View>
  );
};

export default FileUploaderInput;
