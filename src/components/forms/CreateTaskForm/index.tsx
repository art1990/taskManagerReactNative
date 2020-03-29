// react
import React, { useEffect } from "react";
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
  const { control, handleSubmit, getValues, register, setValue } = methods;
  const values = getValues();

  useEffect(() => {
    register({ name: "file" });
  }, [register]);

  const onChange = args => args[0].nativeEvent.text;

  const handleUserSubmit = data => {
    onSubmit(data);
  };

  const fileHandleChange = file => {
    setValue("file", file);
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
          onChange={onChange}
          rules={{ required: true }}
          defaultValue=""
        />
        <Controller
          as={FormInput}
          style={styles.ipnut}
          label="Project"
          control={control}
          name="project"
          onChange={onChange}
          rules={{ required: true }}
          defaultValue=""
        />
        <FileUploaderInput
          style={styles.ipnut}
          label="Add file"
          name="file"
          onBlur={fileHandleChange}
          value={values.file?.name}
        />
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
