// react
import React from "react";
import { View, StyleSheet } from "react-native";
// componets
import FormInput from "../../forms/components/FormInput";
import Button from "../../Button";
import FileUploaderInput from "../../FileUploaderInput";
// react-hook-form
import { useForm, Controller, FormContext } from "react-hook-form";
// validation
import { LoginSchema } from "../../../utils/validation";

interface ILoginForm {
  onSubmit: any;
  style?: {};
}

type FormData = {
  email: string;
  password: string;
};

const LoginForm: React.FC<ILoginForm> = ({ style, onSubmit }) => {
  const methods = useForm<FormData>({});
  const { control, handleSubmit, getValues } = methods;
  const handleUserSubmit = data => {
    onSubmit(data);
  };

  // console.log(getValues());
  return (
    <View style={style}>
      <FormContext {...methods}>
        <Controller
          as={FormInput}
          style={styles.ipnut}
          label="Title"
          control={control}
          name="title"
          onChange={args => args[0].nativeEvent.text}
          rules={{ required: true }}
          defaultValue=""
        />
        <Controller
          as={FormInput}
          style={styles.ipnut}
          label="Project"
          control={control}
          name="project"
          onChange={args => args[0].nativeEvent.text}
          rules={{ required: true }}
          defaultValue=""
        />
        {/* <Controller
          as={FileUploaderInput}
          style={styles.ipnut}
          label="Add file"
          control={control}
          name="file"
          onChange={args => console.log(args)}
          rules={{ required: true }}
          defaultValue=""
        /> */}
        <Button onPress={handleSubmit(handleUserSubmit)}>Start task</Button>
      </FormContext>
    </View>
  );
};

const styles = StyleSheet.create({
  ipnut: {
    marginBottom: 20
  }
});

export default LoginForm;
