// react
import React, { useEffect, ReactElement } from "react";
import { View, StyleSheet, Text } from "react-native";
// componets
import FormInput from "../../forms/components/FormInput";
import InfoAndRemoveFile from "./InfoAndRemoveFile";
import Button from "../../Button";
import FileUploaderInput from "../../FileUploaderInput";
import TagInput from "./TagInput";
import KeyboardView from "../../KeyboardView";
// react-hook-form
import { useForm, Controller, FormContext } from "react-hook-form";
// hooks
import useTags from "../../../hooks/useTags";
// validation
import { CreateTaskSchema } from "../../../utils/validation";

export interface ITaskForm {
  onSubmit: any;
  isEditing?: boolean;
  formData?: TaskFormData;
  style?: {};
  children?: ReactElement;
}

type TaskFormData = {
  file: { name?: string; size?: number; uri?: string };
  defaultValues: { tags: string[] };
};

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
    validationSchema: CreateTaskSchema,
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

  const file: TaskFormData["file"] = watch("file");
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

  const handleUserSubmit = (props) => {
    const { file, ...data } = props;

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
    <View style={[styles.container, style]}>
      <FormContext {...methods}>
        <KeyboardView>
          <Controller
            testID="title"
            as={FormInput}
            style={styles.input}
            label="Title"
            name="title"
            onChange={onChange}
            rules={{ required: true }}
          />
          <Controller
            testID="project"
            as={FormInput}
            style={styles.input}
            label="Project"
            control={control}
            name="project"
            onChange={onChange}
            rules={{ required: true }}
          />
          {children || null}
          <Controller as={TagInput} name="tags" tags={tags} />
          {!name ? (
            <FileUploaderInput
              style={[styles.input, styles.fileLoader]}
              label="Add file"
              name="file"
              onBlur={fileHandleChange}
            />
          ) : (
            <InfoAndRemoveFile name={name} onRemovePress={removeTaskFile} />
          )}
        </KeyboardView>
        <Button
          testID="taskFormBtn"
          style={styles.button}
          onPress={handleSubmit(handleUserSubmit)}
        >
          {buttonText}
        </Button>
      </FormContext>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: 10,
  },
  input: {
    marginBottom: 20,
  },
  fileLoader: {
    marginTop: 15,
  },
  button: {},
});

export default TaskForm;
