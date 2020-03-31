// react
import React, { useEffect } from "react";
import { View } from "react-native";
// components
import Button from "../../components/Button";
// api
import { generateTasksApi } from "../../services/api";
// utils
import { generateTasksData } from "../../utils/facker";

const GenerateListOfTask = () => {
  // useEffect(() => {
  //   generateTasksApi();
  // }, []);

  return (
    <Button mode="text" onPress={() => generateTasksApi()}>
      Generate
    </Button>
  );
};

export default GenerateListOfTask;
