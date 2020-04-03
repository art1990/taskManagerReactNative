// react
import React from "react";
// components
import Title from "../../components/Title";
import IconButton from "../../components/IconButton";
// colors
import { Colors } from "../../assets/styles/constants";
// interface
import { ITitle } from "../../components/Title/index";

interface ITitleWithFilter extends ITitle {
  onPressFilter?: () => void;
  isHasTag: boolean;
}

const TitleWithFilter: React.FC<ITitleWithFilter> = ({
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
