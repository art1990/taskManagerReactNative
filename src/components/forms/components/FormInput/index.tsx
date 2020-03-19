// react
import React from "react";
import { Text, View, StyleSheet } from "react-native";
// components
import Input from "../../../Input";
// react-hook-form
import { useFormContext } from "react-hook-form";
// interfase
import { InputProps } from "../../../Input";

const FormInput: React.FC<InputProps> = props => {
  const context = useFormContext();
  const error = context?.errors[props.name];

  return (
    <View>
      <Input {...props} style={error && styles.errorStyle} />
      {error && <Text>{error.message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  errorStyle: {
    borderColor: "red"
  }
});

export default FormInput;
