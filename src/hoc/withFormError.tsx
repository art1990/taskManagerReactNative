// react
import React from "react";
import { Text, View, StyleSheet } from "react-native";
// react-hook-form
import { useFormContext } from "react-hook-form";
// constants
import { Colors } from "../assets/styles/constants";

function withFormError<T>(Component: React.ComponentType<T>) {
  return React.forwardRef((props: T, ref) => {
    const context = useFormContext();
    const error = context?.errors[props.name];

    return (
      <View style={styles.container}>
        <Component
          {...props}
          ref={ref}
          placeholderColor={error && Colors.error}
          isError={!!error}
        />
        {error && <Text style={styles.text}>{error.message}</Text>}
      </View>
    );
  });
}
const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  text: {
    position: "absolute",
    bottom: -2,
    color: Colors.error,
  },
});

export default withFormError;
