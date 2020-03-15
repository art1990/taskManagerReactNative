// react
import React, { useEffect } from "react";
import { View, Button, Alert } from "react-native";
// expo
import * as ImagePicker from "expo-image-picker";

// firebase
import { storage } from "../../fireBase";

const FileUploaderInput = () => {
  const uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = storage.ref().child("images/" + imageName);
    return ref.put(blob);
  };

  const onChooseImagePress = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission to access camera roll is required!");
      return;
    }
    let result = await ImagePicker.launchCameraAsync();

    if (!result.cancelled) {
      uploadImage(result.uri, "test-image")
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
      <Button title="Choose image..." onPress={onChooseImagePress} />
    </View>
  );
};

export default FileUploaderInput;
