import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("Это обьязательно поле!")
    .email("Некоректная почта"),
  password: yup.string().required("Это обьязательно поле!").min(6).max(30),
});

export const registrationSchema = yup.object().shape({
  fullName: yup.string().required("Это обьязательно поле!").min(6),
  email: yup
    .string()
    .required("Это обьязательно поле!")
    .email("Некоректная почта"),
  password: yup.string().required("Это обьязательно поле!").min(6).max(30),
});
