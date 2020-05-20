// react
import React from "react";
import { View, StyleSheet } from "react-native";
// componets
import FormInput from "../../forms/components/FormInput";
import FormPasswordInput from "../../forms/components/FormPasswordInput";
import Button from "../../Button";
import KeyboardView from "../../KeyboardView";
// react-hook-form
import { useForm, Controller, FormContext } from "react-hook-form";
// validation
import { LoginSchema } from "../../../utils/validation";
// types
import { IAuthForm, ILoginFormData } from "../types";

const LoginForm: React.FC<IAuthForm> = ({ style, onSubmit, isLoading }) => {
  const methods = useForm<ILoginFormData>({
    validationSchema: LoginSchema,
  });
  const { control, handleSubmit } = methods;
  const handleUserSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <View style={style}>
      <KeyboardView>
        <FormContext {...methods}>
          <Controller
            testID="email"
            as={FormInput}
            style={styles.input}
            label="Email"
            control={control}
            name="email"
            onChange={(args) => args[0].nativeEvent.text}
            rules={{ required: true }}
            defaultValue=""
          />
          <Controller
            testID="password"
            as={FormPasswordInput}
            style={styles.input}
            label="Password"
            control={control}
            name="password"
            onChange={(args) => args[0].nativeEvent.text}
            defaultValue=""
          />
          <Button
            style={styles.button}
            onPress={handleSubmit(handleUserSubmit)}
            loading={isLoading}
          >
            Login
          </Button>
        </FormContext>
      </KeyboardView>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 18,
  },
  button: {
    marginTop: 6,
  },
});

export default LoginForm;
