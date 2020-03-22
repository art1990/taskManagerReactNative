// yup
import * as yup from "yup";

export const SignUpSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .min(6)
    .required(),
  passwordConfirm: yup
    .string()
    .min(6)
    .required()
});
export const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .min(6)
    .required()
});
export const CreateTaskSchema = yup.object().shape({});
