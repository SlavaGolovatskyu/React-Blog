import React from 'react';
import { useSelector } from 'react-redux';

import dateToLocaleString from './../../utils/dateToLocaleString';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Articles from '../Articles/Articles';

import styles from './index.module.scss';

const Profile = () => {
  const [activeBtn, setActiveBtn] = React.useState(0);
  const user = useSelector((state) => state.user);

  const createdAt = dateToLocaleString(user.createdAt);

  return (
    <Grid
      sx={{ width: '60%' }}
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Box sx={{ minWidth: '100%' }}>
        <div className={styles.user__info}>
          <h1 className={styles.user__name}>{user.fullName}</h1>
          <h4 className={styles.user__created_at}>
            Дата регистрации: <strong>{createdAt}</strong>
          </h4>
          <button
            onClick={() => setActiveBtn(0)}
            className={
              styles.btn__change_menu + ' ' + (activeBtn === 0 ? styles.btn__green : null)
            }
          >
            Статьи
          </button>
          <button
            onClick={() => setActiveBtn(1)}
            className={
              styles.btn__change_menu + ' ' + (activeBtn === 1 ? styles.btn__green : null)
            }
          >
            Коментарии
          </button>
        </div>
        <div className={styles.margin + ' ' + styles.maxHeight}>
          {activeBtn === 0 && <Articles isUser={true} />}
        </div>
      </Box>
    </Grid>
  );
};

export default Profile;
