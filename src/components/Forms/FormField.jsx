import React from 'react';
import { useFormContext } from 'react-hook-form';
import TextField from '@mui/material/TextField';

// stateless component
export const FormField = ({ label, name }) => {
  const { formState, register } = useFormContext();
  const { errors } = formState;

  return (
    <TextField
      sx={{ margin: '20px 0', borderRadius: '20px' }}
      label={label}
      name={name}
      id="outlined-basic"
      variant="outlined"
      {...register(name)}
      helperText={errors[name] && errors[name].message}
      error={!!errors[name]}
      fullWidth
    />
  );
};
