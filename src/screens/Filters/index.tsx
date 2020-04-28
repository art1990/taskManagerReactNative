// react
import React, { useState } from "react";
import { View } from "react-native";
// redux
import { useSelector } from "react-redux";
import { selectMeta } from "../../redux/task/selectors";
// hooks
import { useTags } from "../../hooks/useTags";
// components
import TitleWithFilter from "../sections/TitleWithFilter";
import TagView from "../components/TagView";
// assets
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

export default Filters;
