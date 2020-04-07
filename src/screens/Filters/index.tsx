// react
import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
// redux
import { useSelector } from "react-redux";
import { selectMeta } from "../../redux/task/selectors";
// hooks
import { useTags } from "../../hooks/useTags";
// components
import TitleWithFilter from "../sections/TitleWithFilter";
import TagView from "../components/TagView";
// assets
import { Colors } from "../../assets/styles/constants";
import Styles from "../../assets/styles";

const Filters: React.FC = () => {
  const { allTags, updateTagFilter } = useTags();
  const { filters, isLoading } = useSelector(selectMeta);

  return (
    <View style={Styles.wrapper}>
      <TitleWithFilter text="Filters" isHasTag={!!filters} />
      {!isLoading && (
        <TagView
          allTags={allTags}
          initialTags={filters}
          buttonAction={updateTagFilter}
          buttonText="Apply filters"
        />
      )}
    </View>
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
