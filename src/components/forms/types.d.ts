// types
import { typeStyleObj } from "react-native/Libraries/StyleSheet/StyleSheetTypes";

export interface IAuthForm {
  onSubmit: (value) => void;
  style?: typeStyleObj;
}

export interface ILoginFormData {
  email: string;
  password: string;
}

export interface ISignUpFormData extends ILoginFormData {
  passwordConfirm: string;
}
