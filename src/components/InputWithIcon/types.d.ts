// types
import { IInputProps } from "../Input/types";

export interface IInputWithIconProps extends IInputProps {
  onPress: (data?) => void;
  inputStyle?: [] | {};
  style?: {} | [];
  icon: IIconButtonProps["icon"];
  iconSize?: IIconButtonProps["size"];
  disabled?: boolean;
}
