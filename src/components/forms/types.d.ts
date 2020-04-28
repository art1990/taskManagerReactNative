export interface IAuthForm {
  onSubmit: any;
  style?: {};
}

export interface ILoginFormData {
  email: string;
  password: string;
}

export interface ISignUpFormData extends ILoginFormData {
  passwordConfirm: string;
}
