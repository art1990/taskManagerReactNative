// react
import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";

// componets
import FormInput from "../../forms/components/FormInput";
import InfoAndRemoveFile from "./InfoAndRemoveFile";
import Button from "../../Button";
import FileUploaderInput from "../../FileUploaderInput";
// react-hook-form
import { useForm, Controller, FormContext } from "react-hook-form";
// validation
import { LoginSchema } from "../../../utils/validation";

interface ITaskForm {
  onSubmit: any;
  isEditing?: boolean;
  formData?: {};
  style?: {};
}

type FormData = {
  email: string;
  password: string;
};

const TaskForm: React.FC<ITaskForm> = ({
  isEditing,
  formData,
  style,
  onSubmit
}) => {
  const methods = useForm({
    defaultValues: formData?.defaultValues
  });
  const {
    control,
    handleSubmit,
    register,
    unregister,
    setValue,
    getValues,
    watch
  } = methods;
  const file = watch("file");
  const name = file?.name;
  console.log("file", file);
  console.log("fileProp", formData?.file);
  useEffect(() => {
    if (!file) {
      register({ name: "file" });
      formData?.file && setValue("file", formData.file);
    }

    return () => unregister("file");
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
  console.log(getValues());
  const buttonText = `${isEditing ? "Update" : "Start"} task`;
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
        />
        <Controller
          as={FormInput}
          style={styles.ipnut}
          label="Project"
          control={control}
          name="project"
          onChange={onChange}
          rules={{ required: true }}
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

export default TaskForm;
