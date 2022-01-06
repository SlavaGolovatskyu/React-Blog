import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "./Schemes";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";

import { FormField } from "./FormField";

import { Login } from "../../redux/actions/user";
import { formContextProvider } from "../../context/formContext";
import { useDispatch } from "react-redux";

export default function LoginForm() {
  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });

  const dispatch = useDispatch();
  const { formOpen, handleClick } = React.useContext(formContextProvider);

  const onSubmit = (data) => {
    dispatch(Login(data.email, data.password));
    handleClick();
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <Dialog
        open={formOpen.login}
        onClose={() => handleClick("login")}
        aria-describedby="alert-dialog-slide-description"
      >
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 4, width: "45ch" },
            display: "flex",
            flexDirection: "column",
          }}
          noValidate
          autoComplete="off"
        >
          <FormField label="почта" name="email" />
          <FormField label="пароль" name="password" />
        </Box>
        <DialogActions>
          <Box
            sx={{
              "& > :not(style)": { m: 2, width: "45ch" },
              margin: "0 auto",
            }}
            noValidate
            autoComplete="off"
          >
            <Button
              variant="contained"
              onClick={methods.handleSubmit(onSubmit)}
            >
              Войти
            </Button>
          </Box>
        </DialogActions>
        <Box
          sx={{
            "& > :not(style)": { m: 2, width: "25ch" },
            margin: "0 auto",
          }}
          noValidate
          autoComplete="off"
        >
          <Button
            variant="contained"
            onClick={() => handleClick("registration")}
          >
            Зарегистрироваться
          </Button>
        </Box>
      </Dialog>
    </FormProvider>
  );
}
