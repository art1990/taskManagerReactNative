// react
import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
// redux
import { useSelector } from "react-redux";
import { selectMeta } from "../../redux/task/selectors";
// hooks
import { useTags } from "../../hooks/useTags";
// components
import TitleWithFilter from "../sections/TitleWithFilter";
import TagView from "../components/TagView";
// styles
import { Colors } from "../../assets/styles/constants";

const Filters: React.FC = () => {
  const { allTags, updateTagFilter } = useTags();
  const { filters, isLoading } = useSelector(selectMeta);

  return (
    <ScrollView>
      <TitleWithFilter text="Filters" isHasTag={!!filters} />
      {!isLoading && (
        <TagView
          allTags={allTags}
          initialTags={filters}
          buttonAction={updateTagFilter}
          buttonText="Apply filters"
        />
      )}
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

export default Filters;
