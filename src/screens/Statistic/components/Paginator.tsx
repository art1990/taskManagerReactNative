// react
import React from "react";
import { View, Text, StyleSheet } from "react-native";
// components
import IconButton from "../../../components/IconButton";
// styles
import Styles from "../../../assets/styles";
// types
import { IPaginatorProps } from "../../../types";

const Paginator: React.FC<IPaginatorProps> = ({
  text,
  onNextPress,
  onPrevPress,
}) => (
  <View style={Styles.rowSpaceBetween}>
    <IconButton icon="prev" onPress={onPrevPress} />
    <Text>{text}</Text>
    <IconButton icon="next" onPress={onNextPress} />
  </View>
);

const styles = StyleSheet.create({
  constainer: {},
});

export default Paginator;
