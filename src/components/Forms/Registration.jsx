import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registrationSchema } from './Schemes';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';

import { FormField } from './FormField';

import { formContextProvider } from '../../context/formContext';
import { Registration } from '../../redux/actions/user';
import styles from './index.module.scss';

export const RegistrationForm = () => {
  const methods = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
    resolver: yupResolver(registrationSchema),
  });

  const [loading, setLoading] = React.useState(false);

  const dispatch = useDispatch();
  const { formOpen, handleClickOpenForm } = React.useContext(formContextProvider);

  const onSubmit = (data) => {
    setLoading(true);
    dispatch(Registration(data.fullName, data.email, data.password, methods.setError));
    setLoading(false);
  };

  return (
    <FormProvider {...methods}>
      <Dialog
        open={formOpen.registration}
        onClose={() => handleClickOpenForm('registration')}
        aria-describedby="alert-dialog-slide-description"
      >
        <Box
          component="form"
          sx={{
            width: 300,
            height: 320,
            display: 'flex',
            flexDirection: 'column',
            margin: '35px',
          }}
          noValidate
          autoComplete="off"
        >
          <h2>Зарегистрировать аккаунт</h2>
          <FormField label="Полное имя" name="fullName" />
          <FormField label="Почта" name="email" />
          <FormField label="Пароль" name="password" />
        </Box>
        <DialogActions>
          <Box
            sx={{
              margin: '0 auto',
              marginTop: '20px',
            }}
            noValidate
            autoComplete="off"
          >
            <button disabled={loading} onClick={methods.handleSubmit(onSubmit)} className={styles.btn}>
              Зарегистрировать аккаунт
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
          <Button variant="contained" onClick={() => handleClickOpenForm('login')}>
            Войти
          </Button>
        </Box>
      </Dialog>
    </FormProvider>
  );
};

export default RegistrationForm;
