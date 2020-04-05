// react
import React from "react";
// components
import Title from "../../components/Title";
import IconButton from "../../components/IconButton";
// colors
import { Colors } from "../../assets/styles/constants";
// types
import { ITitleWithFilterProps } from "../../types";

const TitleWithFilter: React.FC<ITitleWithFilterProps> = ({
  onPressFilter,
  isHasTag,
  ...rest
}) => {
  const color = isHasTag ? Colors.error : Colors.black;

  return (
    <Title {...rest}>
      <IconButton icon="filter" color={color} onPress={onPressFilter} />
    </Title>
  );
};

export default TitleWithFilter;
