// react
import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
// components
import Input from "../../components/Input";
import IconButton from "../../components/IconButton";
// types
import { IInputWithIconProps } from "../../types";

const InputWithIcon: React.FC<IInputWithIconProps> = ({
  onChangeText,
  value,
  onPress,
  label,
  style,
  inputStyle,
  icon,
  iconSize = 20,
  ...rest
}) => {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 0,
          position: "relative",
        },
        input: {
          zIndex: 0,
        },
        icon: {
          position: "absolute",
          right: 10,
          top: "50%",
          transform: [{ translateY: -iconSize }],
          zIndex: 1,
        },
      }),
    [iconSize]
  );

  return (
    <View style={[styles.container, inputStyle]}>
      <IconButton
        icon={icon}
        onPress={onPress}
        style={[styles.icon]}
        size={iconSize}
      />
      <Input
        {...rest}
        label={label}
        onChangeText={onChangeText}
        value={value}
        style={[styles.input]}
      />
    </View>
  );
};

export default InputWithIcon;
