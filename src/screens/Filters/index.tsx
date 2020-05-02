// react
import React, { useEffect } from "react";
import { View } from "react-native";
// redux
import { useSelector } from "react-redux";
import { selectMeta } from "../../redux/task/selectors";
// hooks
import useTags from "../../hooks/useTags";
import useIsMounted from "../../hooks/useIsMounted";
// components
import TitleWithFilter from "../sections/TitleWithFilter";
import TagView from "../components/TagView";
import Spinner from "../../components/Spinner";
// assets
import Styles from "../../assets/styles";

const Filters: React.FC = () => {
  const { allTags, updateTagFilter, getTagsList } = useTags();
  const isMounted = useIsMounted();
  const { filters, isLoading } = useSelector(selectMeta);

  useEffect(() => {
    getTagsList();
  }, []);

  const isLoader = isLoading || !isMounted;

  return (
    <View style={Styles.wrapper}>
      <TitleWithFilter text="Filters" isHasTag={!!filters} />
      {isLoader ? (
        <Spinner />
      ) : (
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
