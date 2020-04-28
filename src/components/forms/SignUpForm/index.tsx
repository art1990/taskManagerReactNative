// react
import React from "react";
import { View, StyleSheet } from "react-native";
// componets
import FormInput from "../../forms/components/FormInput";
import FormPasswordInput from "../../forms/components/FormPasswordInput";
import Button from "../../Button";
import KeyboardView from "../../KeyboardView";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// react-hook-form
import { useForm, Controller, FormContext } from "react-hook-form";
// validation
import { SignUpSchema } from "../../../utils/validation";
// types
import { IAuthForm, ISignUpFormData } from "../types";

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
    <View>
      <KeyboardView>
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
          <Button
            style={styles.button}
            onPress={handleSubmit(handleUserSubmit)}
          >
            Submit
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

export default SignUpForm;
