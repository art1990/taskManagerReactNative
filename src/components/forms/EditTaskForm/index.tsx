// react
import React from "react";
import { View, StyleSheet } from "react-native";
// componets
import FormInput from "../../forms/components/FormInput";
import Button from "../../Button";
// react-hook-form
import { useForm, Controller, FormContext } from "react-hook-form";
// interface
import { ITaskState } from "../../../redux/task";
// validation
import { LoginSchema } from "../../../utils/validation";

interface ISignUpForm {
  onSubmit: any;
  taskData: ITaskState["taskData"];
  style?: {};
}

type FormData = {
  email: string;
  password: string;
};

const LoginForm: React.FC<ISignUpForm> = ({ style, taskData, onSubmit }) => {
  const methods = useForm<FormData>({
    defaultValues: taskData
  });
  const { control, handleSubmit } = methods;
  const handleUserSubmit = data => {
    onSubmit(data);
  };

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
        />
        <Controller
          as={FormInput}
          style={styles.ipnut}
          label="Project"
          control={control}
          name="project"
          onChange={args => args[0].nativeEvent.text}
          rules={{ required: true }}
        />
        <Button onPress={handleSubmit(handleUserSubmit)}>Edit task</Button>
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
