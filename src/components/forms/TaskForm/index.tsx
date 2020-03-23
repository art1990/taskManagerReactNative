// react
import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";

// componets
import FormInput from "../../forms/components/FormInput";
import InfoAndRemoveFile from "./InfoAndRemoveFile";
import Button from "../../Button";
import FileUploaderInput from "../../FileUploaderInput";
// interface
import { ITaskState } from "../../../redux/task";
// react-hook-form
import { useForm, Controller, FormContext } from "react-hook-form";
// validation
import { LoginSchema } from "../../../utils/validation";

interface ITaskForm {
  onSubmit: any;
  isEditing?: boolean;
  taskData?: ITaskState["taskData"];
  style?: {};
}

type FormData = {
  email: string;
  password: string;
};

const LoginForm: React.FC<ITaskForm> = ({
  isEditing,
  taskData,
  style,
  onSubmit
}) => {
  const methods = useForm({
    defaultValues: taskData
  });
  const { control, handleSubmit, register, setValue, watch } = methods;
  const { file } = watch();
  const name = file?.name;

  useEffect(() => {
    register({ name: "file" });
  }, [register]);

  const onChange = args => args[0].nativeEvent.text;

  const handleUserSubmit = data => {
    onSubmit(data);
  };

  const fileHandleChange = data => {
    setValue("file", data);
  };

  const removeTaskFile = () => {
    setValue("file", null);
  };

  const buttonText = `${isEditing ? "Update" : "Start"} task`;
  console.log("file", file);
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
        {!name ? (
          <FileUploaderInput
            style={styles.ipnut}
            label="Add file"
            name="file"
            onBlur={fileHandleChange}
          />
        ) : (
          <InfoAndRemoveFile name={name} onRemovePress={removeTaskFile} />
        )}
        <Button onPress={handleSubmit(handleUserSubmit)}>{buttonText}</Button>
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
