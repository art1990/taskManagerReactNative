// react
import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
// hooks
import { useTags } from "../../hooks/useTags";
// components
import Title from "../../components/Title";
import TagView from "../components/TagView";
// styles
import { Colors } from "../../assets/styles/constants";

interface IFilters {
  value: string[];
}

const AddTags: React.FC<IFilters> = () => {
  const { allTags, tags: initialTags, updateTagFilter } = useTags();

  return (
    <ScrollView>
      <Title text="Filters" />
      <TagView
        allTags={allTags}
        initialTags={initialTags}
        buttonAction={updateTagFilter}
        buttonText="Apply filters"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  currenTagContainer: {
    marginBottom: 10
  },
  line: {
    borderBottomColor: Colors.line,
    borderBottomWidth: 1
  },
  tag: {
    marginHorizontal: 7,
    marginVertical: 18
  }
});

export default AddTags;
