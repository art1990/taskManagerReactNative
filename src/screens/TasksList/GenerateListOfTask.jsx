// react
import React from "react";
import { View, Text, StyleSheet } from "react-native";
// components
import Button from "../../components/Button";
// hook
import useFacker from "../../hooks/task/useFacker";

const GenerateListOfTask = () => {
  const { generateTasks } = useFacker();

  return (
    <View style={StyleSheet.container}>
      <Text style={styles.text}>You don’t have tasks recently added.</Text>
      <Button
        labelStyle={[styles.button, styles.text]}
        mode="text"
        onPress={generateTasks}
      >
        Generate list of tasks
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: "column",
  },
  button: {
    textDecorationLine: "underline",
  },
  text: {
    fontSize: 14,
    lineHeight: 21,
    alignSelf: "center",
  },
});

export default GenerateListOfTask;
