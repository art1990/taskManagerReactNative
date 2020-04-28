export interface IInputProps {
  style?: {};
  name: string;
  value: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  label?: string;
  placeholder?: string;
  placeholderColor?: string;
  keyboardType?: KeyboardTypeOptions;
}
