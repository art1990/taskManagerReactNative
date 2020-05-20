// types
import { typeStyleObj } from "react-native/Libraries/StyleSheet/StyleSheetTypes";

export interface IInputProps {
  style?: typeStyleObj;
  name?: string;
  value: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  label?: string;
  placeholder?: string;
  placeholderColor?: string;
  keyboardType?: KeyboardTypeOptions;
}
