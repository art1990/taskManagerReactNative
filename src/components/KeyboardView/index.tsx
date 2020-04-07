// react
import React from "react";
import {
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  Platform,
  StyleSheet,
} from "react-native";
// utils
import { useHeaderHeight } from "@react-navigation/stack";

const KeyboardView: React.FC<KeyboardAvoidingViewProps> = ({
  children,
  style,
}) => {
  const headerHeight = useHeaderHeight();
  return (
    <KeyboardAvoidingView
      style={[styles.container, style]}
      behavior="padding"
      keyboardVerticalOffset={headerHeight}
      enabled={Platform.select({
        ios: true,
        android: true,
      })}
    >
      {children}
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default KeyboardView;
