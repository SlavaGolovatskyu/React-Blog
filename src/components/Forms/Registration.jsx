import React from "react";
import { useDispatch } from "react-redux";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registrationSchema } from "./Schemes";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";

import { FormField } from "./FormField";

import { formContextProvider } from "../../context/formContext";
import { Registration } from "../../redux/actions/user";

export const RegistrationForm = () => {
  const methods = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(registrationSchema),
  });

  const dispatch = useDispatch();
  const { formOpen, handleClick } = React.useContext(formContextProvider);

  const onSubmit = (data) => {
    dispatch(Registration(data.fullName, data.email, data.password));
    handleClick();
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <Dialog
        open={formOpen.registration}
        onClose={() => handleClick("registration")}
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
          <FormField label="Полное имя" name="fullName" />
          <FormField label="Почта" name="email" />
          <FormField label="Пароль" name="password" />
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
              Зарегистрироваться
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
          <Button variant="contained" onClick={() => handleClick("login")}>
            Войти
          </Button>
        </Box>
      </Dialog>
    </FormProvider>
  );
};

export default RegistrationForm;
