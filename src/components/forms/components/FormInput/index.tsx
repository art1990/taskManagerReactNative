// react
import React from "react";
import { Text, View, StyleSheet } from "react-native";
// components
import Input from "../../../Input";
// react-hook-form
import { useFormContext } from "react-hook-form";
// interfase
import { IInputProps } from "../../../Input";

const FormInput: React.FC<IInputProps> = props => {
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
