// react
import React from "react";
import { View, StyleSheet } from "react-native";
// componets
import FormInput from "../../forms/components/FormInput";
import FormPasswordInput from "../../forms/components/FormPasswordInput";
import Button from "../../Button";
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
    <View style={style}>
      <FormContext {...methods}>
        <Controller
          as={FormInput}
          style={styles.ipnut}
          label="Email"
          control={control}
          name="email"
          onChange={(args) => args[0].nativeEvent.text}
          rules={{ required: true }}
          defaultValue=""
        />
        <Controller
          as={FormPasswordInput}
          style={styles.ipnut}
          label="Password"
          control={control}
          name="password"
          onChange={(args) => args[0].nativeEvent.text}
          defaultValue=""
        />
        <Controller
          as={FormPasswordInput}
          style={styles.ipnut}
          label="Repeat password"
          control={control}
          name="passwordConfirm"
          onChange={(args) => args[0].nativeEvent.text}
          defaultValue=""
        />

        <Button onPress={handleSubmit(handleUserSubmit)}>Submit</Button>
      </FormContext>
    </View>
  );
};

const styles = StyleSheet.create({
  ipnut: {
    marginBottom: 15,
  },
});

export default SignUpForm;
