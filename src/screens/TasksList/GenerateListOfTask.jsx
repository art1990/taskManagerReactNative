// react
import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
// components
import Button from "../../components/Button";
// api
import { generateTasksApi } from "../../services/api";

const GenerateListOfTask = () => {
  return (
    <View style={StyleSheet.container}>
      <Text style={styles.text}>You don’t have tasks recently added.</Text>
      <Button
        labelStyle={[styles.button, styles.text]}
        mode="text"
        onPress={() => generateTasksApi()}
      >
        Generate list of tasks
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: "column"
  },
  button: {
    textDecorationLine: "underline"
  },
  text: {
    fontSize: 14,
    lineHeight: 21,
    alignSelf: "center"
  }
});

export default GenerateListOfTask;
