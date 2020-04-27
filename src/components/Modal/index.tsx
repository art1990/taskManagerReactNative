// react
import React from "react";
import { StyleSheet, View, Modal as RNModal } from "react-native";
// type
import { IModalProps } from "../../types";

const Modal: React.FC<IModalProps> = ({ visible }) => (
  <RNModal visible={visible} transparent={true}>
    <View style={styles.wrapper} />
  </RNModal>
);

export default Modal;

const styles = StyleSheet.create({
  wrapper: { backgroundColor: "rgba(0,0,0, 0.1)", flex: 1 },
});
