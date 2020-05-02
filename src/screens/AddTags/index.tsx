// react
import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
// hooks
import useTags from "../../hooks/useTags";
// components
import Title from "../../components/Title";
import TagView from "../components/TagView";
import AddTagInput from "./AddTagInput";
// styles
import { Colors } from "../../assets/styles/constants";
import Styles from "../../assets/styles";

const AddTags: React.FC = () => {
  const { allTags, tags: initialTags, addTags } = useTags();

  return (
    <ScrollView
      style={[Styles.wrapper, styles.container]}
      contentContainerStyle={{ flex: 1 }}
    >
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
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

export default AddTags;
