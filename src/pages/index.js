import React from 'react';
import Menu from '../components/Menu/Menu';
import Header from '../components/Header/Header';
import About from '../components/AboutMe/About';
import Articles from '../components/Articles/Articles';
import LoginForm from '../components/Forms/Login';
import RegistrationForm from '../components/Forms/Registration';
import Profile from '../components/Profile/Profile';

import { Logout } from '../redux/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import styles from './pages.module.scss';
import arthur from '../assets/myphoto.jpg';
import myPhoto from '../assets/IMG_0508.jpg';

import { formContextProvider } from '../context/formContext';

export default function MainPage() {
  const [formOpen, setFormOpen] = React.useState({
    login: false,
    registration: false,
  });

  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuth);

  const onClickLogOut = () => {
    localStorage.clear();
    dispatch(Logout());
  };

  const handleClickOpenForm = (name = false) => {
    setFormOpen((prev) => {
      let newObj = {
        login: false,
        registration: false,
      };
      if (!name) {
        return newObj;
      }
      newObj[name] = !prev[name];
      return newObj;
    });
  };

  const contextProvider = {
    formOpen: formOpen,
    handleClickOpenForm: handleClickOpenForm,
  };

  // close forms login and registration if user success log in or registration
  React.useEffect(() => {
    handleClickOpenForm();
  }, [isAuth]);

  return (
    <formContextProvider.Provider value={contextProvider}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.head}>
            <Header handleOpenForm={() => handleClickOpenForm('login')} handleLogOut={onClickLogOut} />
          </div>
        </div>
        <div className={styles.wrapper}>
          <Switch>
            <Route path="/" exact>
              <About />
              <div className={styles.articles}>
                <Articles articles={[1, 2, 3, 4, 5]} />
              </div>
            </Route>
            <Route path="/profile" exact>
              {isAuth ? <Profile /> : <Redirect to="/" />}
            </Route>
          </Switch>
          <Menu handleClickLogout={onClickLogOut} />
          <LoginForm />
          <RegistrationForm />;
        </div>
      </div>
    </formContextProvider.Provider>
  );
}
