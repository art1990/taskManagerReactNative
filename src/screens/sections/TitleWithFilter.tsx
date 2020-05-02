// react
import React from "react";
import { View, StyleSheet } from "react-native";
// components
import Title from "../../components/Title";
import IconButton from "../../components/IconButton";
// colors
import { Colors } from "../../assets/styles/constants";
// types
import { ITitleProps } from "../../components/Title/types";

type TVoid = () => void;

export interface ITitleWithFilterProps extends ITitleProps {
  onPressFilter?: TVoid;
  onPressClearFilter?: TVoid;
  isHasTag: boolean;
}

const TitleWithFilter: React.FC<ITitleWithFilterProps> = ({
  onPressFilter,
  onPressClearFilter,
  isHasTag,
  ...rest
}) => {
  const filterColor = isHasTag ? Colors.error : Colors.black;
  const clearFilterColor = Colors.error;

  return (
    <Title {...rest}>
      <View style={styles.iconContainer}>
        <IconButton icon="filter" color={filterColor} onPress={onPressFilter} />
        <IconButton
          style={styles.clearFilter}
          icon="clearFilter"
          color={clearFilterColor}
          onPress={() => isHasTag && onPressClearFilter()}
        />
      </View>
    </Title>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: "row",
  },
  clearFilter: {
    marginLeft: -10,
  },
});

export default TitleWithFilter;
