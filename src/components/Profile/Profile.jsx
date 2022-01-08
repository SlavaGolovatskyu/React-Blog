import React from 'react';
import getUserById from '../../services/user';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import Articles from '../Articles/Articles';
import dateToLocaleString from './../../utils/dateToLocaleString';
import { postsAction } from '../../redux/actions/posts';

import styles from './index.module.scss';

const Profile = () => {
  const [loading, setLoading] = React.useState(false);
  const [activeBtn, setActiveBtn] = React.useState(0);

  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  React.useEffect(() => {
    setLoading(true);

    const userId = window.localStorage.getItem('_id');

    getUserById(userId)
      .then((result) => {
        // if id is not valid
        if (!result) {
          history.push('/');
        } else {
          dispatch(postsAction(userId));
          setLoading(false);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <Grid sx={{ width: '60%' }} container direction="row" justifyContent="center" alignItems="center">
      {loading && (
        <Box sx={{ minWidth: '100%' }}>
          <Typography variant="h1">
            <Skeleton animation="wave" />
          </Typography>
          <Typography variant="h4">
            <Skeleton animation="wave" />
          </Typography>
          <Typography sx={{ m: '10px 0' }}>
            <Skeleton animation="wave" />
          </Typography>
          <Skeleton height={300} variant="rectangular" animation="wave" />
        </Box>
      )}
      {!loading && (
        <Box sx={{ minWidth: '100%' }}>
          <div className={styles.user__info}>
            <h1 className={styles.user__name}>{user.fullName}</h1>
            <h4 className={styles.user__created_at}>
              Дата регистрации: <strong>{dateToLocaleString(user.createdAt)}</strong>
            </h4>
            <button
              onClick={() => setActiveBtn(0)}
              className={styles.btn__change_menu + ' ' + (activeBtn === 0 ? styles.btn__green : null)}
            >
              Статьи
            </button>
            <button
              onClick={() => setActiveBtn(1)}
              className={styles.btn__change_menu + ' ' + (activeBtn === 1 ? styles.btn__green : null)}
            >
              Коментарии
            </button>
          </div>
          <div className={styles.margin + ' ' + styles.maxHeight}>
            <Articles isUser={true} />
          </div>
        </Box>
      )}
    </Grid>
  );
};

export default Profile;
