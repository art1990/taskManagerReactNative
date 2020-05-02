// types
import { typeStyleObj } from "react-native/Libraries/StyleSheet/StyleSheetTypes";

export interface IAuthForm {
  onSubmit: (value) => void;
  style?: typeStyleObj;
  isLoading?: boolean;
}

export interface ILoginFormData {
  email: string;
  password: string;
  isLoading?: boolean;
}

export interface ISignUpFormData extends ILoginFormData {
  passwordConfirm: string;
}
