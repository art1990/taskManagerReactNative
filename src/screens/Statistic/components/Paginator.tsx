// react
import React from "react";
import { View, Text, StyleSheet } from "react-native";
// components
import IconButton from "../../../components/IconButton";

interface IPaginator {
  text: string;
  onNextPress: () => void;
  onPrevPress: () => void;
}

const Paginator: React.FC<IPaginator> = ({
  text,
  onNextPress,
  onPrevPress
}) => (
  <View style={styles.constainer}>
    <IconButton icon="prev" onPress={onPrevPress} />
    <Text>{text}</Text>
    <IconButton icon="next" onPress={onNextPress} />
  </View>
);

const styles = StyleSheet.create({
  constainer: {}
});

export default Paginator;
