// react
import React from "react";
import { Text, View, StyleSheet } from "react-native";
// react-hook-form
import { useFormContext } from "react-hook-form";

function withFormError<T>(Component: React.ComponentType<T>) {
  return (props: T) => {
    const context = useFormContext();
    const error = context?.errors[props.name];

    return (
      <View>
        <Component
          {...props}
          style={error && styles.errorStyle}
          placeholderColor={error && "red"}
        />
        {error && <Text style={styles.text}>{error.message}</Text>}
      </View>
    );
  };
}
const styles = StyleSheet.create({
  errorStyle: {
    borderColor: "red"
  },
  text: {
    color: "red"
  }
});

export default withFormError;
