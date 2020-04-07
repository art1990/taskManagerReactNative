// react
import React from "react";
import {
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  Platform,
  StyleSheet,
  ScrollView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// utils
import { useHeaderHeight } from "@react-navigation/stack";

const KeyboardView: React.FC<KeyboardAvoidingViewProps> = ({
  children,
  style,
  ...rest
}) => {
  const headerHeight = useHeaderHeight();
  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled={false}
      enableOnAndroid
      {...rest}
    >
      {children}
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: "center",
  },
});

export default KeyboardView;
