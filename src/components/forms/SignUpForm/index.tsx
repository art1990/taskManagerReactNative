// react
import React from "react";
import { View, Button, Alert } from "react-native";
// componets
import FormInput from "../../forms/components/FormInput";
import FormPasswordInput from "../../forms/components/FormPasswordInput";
// react-hook-form
import { useForm, Controller, FormContext } from "react-hook-form";
// validation
import { SignUpSchema } from "../../../utils/validation";

interface ISignUpForm {
  onSubmit: any;
}

type FormData = {
  email: string;
  password: string;
  passwordConfirm: string;
};

const SignUpForm: React.FC<ISignUpForm> = ({ onSubmit }) => {
  const methods = useForm<FormData>({
    validationSchema: SignUpSchema
  });
  const { control, handleSubmit } = methods;
  const handleUserSubmit = data => {
    console.log(data);
    onSubmit(data);
  };

  return (
    <View>
      <FormContext {...methods}>
        <Controller
          as={FormInput}
          label="Email"
          control={control}
          name="email"
          onChange={args => args[0].nativeEvent.text}
          rules={{ required: true }}
          defaultValue=""
        />
        <Controller
          as={FormPasswordInput}
          label="Password"
          control={control}
          name="password"
          onChange={args => args[0].nativeEvent.text}
          defaultValue=""
        />
        <Controller
          as={FormPasswordInput}
          label="Repeat password"
          control={control}
          name="passwordConfirm"
          onChange={args => args[0].nativeEvent.text}
          defaultValue=""
        />

        <Button title="Submit" onPress={handleSubmit(handleUserSubmit)} />
      </FormContext>
    </View>
  );
};

export default SignUpForm;
