// react
import React, { useEffect, ReactElement } from "react";
import { View, StyleSheet, Text } from "react-native";
// componets
import FormInput from "../../forms/components/FormInput";
import InfoAndRemoveFile from "./InfoAndRemoveFile";
import Button from "../../Button";
import FileUploaderInput from "../../FileUploaderInput";
import TagInput from "./TagInput";
// react-hook-form
import { useForm, Controller, FormContext } from "react-hook-form";
// hooks
import { useTags } from "../../../hooks/useTags";
// validation
import { LoginSchema } from "../../../utils/validation";
// types
import { ITaskForm } from "../../../types";

const TaskForm: React.FC<ITaskForm> = ({
  isEditing,
  formData,
  style,
  onSubmit,
  children,
}) => {
  const defaultValues = formData?.defaultValues;

  const methods = useForm({
    defaultValues,
  });
  const {
    control,
    handleSubmit,
    register,
    unregister,
    setValue,
    watch,
  } = methods;

  const { tags, setTags } = useTags(setValue);

  const file = watch("file");
  const name = file?.name;
  useEffect(() => {
    if (!file) {
      register({ name: "file" });
      const file = formData?.file;
      file && setValue("file", file);
    }

    return () => {
      unregister("file");
      setTags();
    };
  }, [register]);

  useEffect(() => {
    defaultValues?.tags && setTags([...defaultValues.tags, ...tags]);
  }, []);

  const onChange = (args) => args[0].nativeEvent.text;

  const handleUserSubmit = ({ file, ...data }) => {
    const values = file ? { file, ...data } : data;
    onSubmit(values);
  };

  const fileHandleChange = (data) => {
    setValue("file", data);
  };

  const removeTaskFile = () => {
    setValue("file", null);
  };
  const buttonText = `${isEditing ? "Update" : "Start"} task`;
  return (
    <View style={style}>
      <FormContext {...methods}>
        <Controller
          as={FormInput}
          style={styles.ipnut}
          label="Title"
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
        {children || null}
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
        <Controller as={TagInput} name="tags" tags={tags} />

        <Button onPress={handleSubmit(handleUserSubmit)}>{buttonText}</Button>
      </FormContext>
    </View>
  );
};

const styles = StyleSheet.create({
  ipnut: {
    marginBottom: 20,
  },
});

export default TaskForm;
