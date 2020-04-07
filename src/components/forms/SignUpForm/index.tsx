// react
import React from "react";
import { View, StyleSheet } from "react-native";
// componets
import FormInput from "../../forms/components/FormInput";
import FormPasswordInput from "../../forms/components/FormPasswordInput";
import Button from "../../Button";
import KeyBoardView from "../../KeyboardView";
// react-hook-form
import { useForm, Controller, FormContext } from "react-hook-form";
// validation
import { SignUpSchema } from "../../../utils/validation";
// types
import { IAuthForm, ISignUpFormData } from "../../../types";

type FormData = {
  email: string;
  password: string;
  passwordConfirm: string;
};

const SignUpForm: React.FC<IAuthForm> = ({ onSubmit, style }) => {
  const methods = useForm<ISignUpFormData>({
    validationSchema: SignUpSchema,
  });
  const { control, handleSubmit } = methods;
  const handleUserSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <View style={[styles.container, style]}>
      <KeyBoardView>
        <FormContext {...methods}>
          <Controller
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
            as={FormPasswordInput}
            style={styles.input}
            label="Password"
            control={control}
            name="password"
            onChange={(args) => args[0].nativeEvent.text}
            defaultValue=""
          />
          <Controller
            as={FormPasswordInput}
            style={styles.input}
            label="Repeat password"
            control={control}
            name="passwordConfirm"
            onChange={(args) => args[0].nativeEvent.text}
            defaultValue=""
          />
        </FormContext>
        <Button onPress={handleSubmit(handleUserSubmit)}>Submit</Button>
      </KeyBoardView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
  },
  input: {
    marginBottom: 15,
  },
});

export default SignUpForm;
