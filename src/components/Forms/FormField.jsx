import React from "react";
import { useFormContext } from "react-hook-form";
import TextField from "@mui/material/TextField";

// stateless component
export const FormField = ({ label, name }) => {
  const { formState, register } = useFormContext();
  const { errors } = formState;

  return (
    <TextField
      label={label}
      name={name}
      id="standard-basic"
      variant="standard"
      {...register(name)}
      helperText={errors[name] && errors[name].message}
      error={!!errors[name]}
      fullWidth
    />
  );
};
