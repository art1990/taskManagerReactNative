// types
import { IInputProps } from "../Input/types";
import { typeStyleObj } from "react-native/Libraries/StyleSheet/StyleSheetTypes";

export interface IInputWithIconProps extends IInputProps {
  onPress: (data?) => void;
  inputStyle?: typeStyleObj;
  style?: styleObj;
  icon: IIconButtonProps["icon"];
  iconSize?: IIconButtonProps["size"];
  disabled?: boolean;
  testID?: string;
}
