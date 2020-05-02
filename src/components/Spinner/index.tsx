// react
import React from "react";
import { ActivityIndicator, View } from "react-native";

export default ({ isChart }) => (
  <View style={{ height: isChart ? 282 : "auto", justifyContent: "center" }}>
    <ActivityIndicator size="large" color="000ff" />
  </View>
);
