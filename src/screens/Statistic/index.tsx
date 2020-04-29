// react
import React, { useMemo } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
// components
import Title from "../../components/Title";
import LoggedTime from "./LoggedTime";
import LoggedTasks from "./LggedTasks";
import LoggedPerDay from "./LoggedPerDay";
// assets
import { Colors } from "../../assets/styles/constants";

const Statistic: React.FC = () => {
  return (
    <View style={[styles.container]}>
      <ScrollView>
        <Title text="Statistic" />
        <LoggedTime />
        <LoggedTasks />
        <LoggedPerDay />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
    backgroundColor: Colors.white,
    paddingLeft: 8,
    paddingRight: 30,
  },
  input: { marginLeft: 26 },
});

export default Statistic;
