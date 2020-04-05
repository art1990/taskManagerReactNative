// react
import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
// hooks
import { useTags } from "../../hooks/useTags";
// components
import Title from "../../components/Title";
import TagView from "../components/TagView";
import AddTagInput from "./AddTagInput";
// styles
import { Colors } from "../../assets/styles/constants";

const AddTags: React.FC = () => {
  const { allTags, tags: initialTags, addTags } = useTags();

  return (
    <ScrollView>
      <Title text="Add tags" />
      <TagView
        allTags={allTags}
        initialTags={initialTags}
        Input={AddTagInput}
        buttonAction={addTags}
        buttonText="Done"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  currenTagContainer: {
    marginBottom: 10,
  },
  line: {
    borderBottomColor: Colors.line,
    borderBottomWidth: 1,
  },
  tag: {
    marginHorizontal: 7,
    marginVertical: 18,
  },
});

export default AddTags;
