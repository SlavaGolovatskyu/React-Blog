import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from './Schemes';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';

import { FormField } from './FormField';

import { login } from '../../redux/actions/user';
import { formContextProvider } from '../../context/formContext';
import { useDispatch } from 'react-redux';

import styles from './index.module.scss';

export default function LoginForm() {
  const methods = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
  });

  const [loading, setLoading] = React.useState(false);

  const dispatch = useDispatch();

  const { formOpen, handleClickOpenForm } = React.useContext(formContextProvider);

  const onSubmit = (data) => {
    setLoading(true);
    dispatch(login(data.email, data.password, methods.setError));
    setLoading(false);
  };

  return (
    <FormProvider {...methods}>
      <Dialog
        open={formOpen.login}
        onClose={() => handleClickOpenForm('login')}
        aria-describedby="alert-dialog-slide-description"
      >
        <Box
          component="form"
          sx={{
            width: 300,
            height: 200,
            display: 'flex',
            flexDirection: 'column',
            margin: '35px',
          }}
          noValidate
          autoComplete="off"
        >
          <h2>Вход в аккаунт</h2>
          <FormField label="Email" name="email" />
          <FormField label="Password" name="password" />
        </Box>
        <DialogActions>
          <Box
            sx={{
              margin: '0 auto',
            }}
            noValidate
            autoComplete="off"
          >
            <button
              onClick={methods.handleSubmit(onSubmit)}
              disabled={loading}
              className={styles.btn}
            >
              Войти
            </button>
          </Box>
        </DialogActions>
        <Box
          sx={{
            margin: '0 auto',
            marginBottom: '20px',
          }}
          noValidate
          autoComplete="off"
        >
          <Button variant="contained" onClick={() => handleClickOpenForm('registration')}>
            Зарегистрироваться
          </Button>
        </Box>
      </Dialog>
    </FormProvider>
  );
}
