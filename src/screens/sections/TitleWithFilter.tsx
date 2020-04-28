// react
import React from "react";
// components
import Title from "../../components/Title";
import IconButton from "../../components/IconButton";
// colors
import { Colors } from "../../assets/styles/constants";
// types
import { ITitleProps } from "../../components/Title/types";

export interface ITitleWithFilterProps extends ITitleProps {
  onPressFilter?: () => void;
  isHasTag: boolean;
}

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
