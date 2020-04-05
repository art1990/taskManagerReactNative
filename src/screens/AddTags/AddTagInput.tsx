// react
import React from "react";
import { View, StyleSheet } from "react-native";
// components
import Input from "../../components/Input";
import IconButton from "../../components/IconButton";
// types
import { IAddTagInputProps } from "../../types";

const AddTagInput: React.FC<IAddTagInputProps> = ({
  onChangeText,
  value,
  onAddPress,
}) => {
  return (
    <View style={styles.container}>
      <IconButton icon="addTag" onPress={onAddPress} style={styles.icon} />
      <Input
        label="Add tag"
        onChangeText={onChangeText}
        value={value}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    position: "relative",
  },
  input: {
    zIndex: 0,
  },
  icon: {
    position: "absolute",
    right: 10,
    top: "20%",
    zIndex: 1,
  },
});

export default AddTagInput;
