// react
import React from "react";
import { ActivityIndicator, View } from "react-native";

const Spinner: React.FC<{ isChart?: boolean }> = ({ isChart }) => (
  <View style={{ height: isChart ? 282 : "auto", justifyContent: "center" }}>
    <ActivityIndicator size="large" color="000ff" />
  </View>
);

export default Spinner;
