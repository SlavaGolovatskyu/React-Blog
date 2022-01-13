import React from 'react';
import Menu from '../components/Menu/Menu';
import Header from '../components/Header/Header';
import About from '../components/AboutMe/About';
import Articles from '../components/Articles/Articles';
import LoginForm from '../components/Forms/Login';
import RegistrationForm from '../components/Forms/Registration';
import Profile from '../components/Profile/Profile';

import { logout } from '../redux/actions/user';

import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router-dom';

import styles from './pages.module.scss';

import { formContextProvider } from '../context/formContext';
import { LoginRoute } from '../utils/ProtectedRoute';
import CreateArticle from '../components/CreateArticle/CreateArticle';

export default function MainPage() {
  const [formOpen, setFormOpen] = React.useState({
    login: false,
    registration: false,
  });

  const history = useHistory();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuth);

  const onClickLogOut = () => {
    localStorage.clear();
    dispatch(logout());
    history.push('/');
  };

  const handleClickOpenForm = (name = false) => {
    setFormOpen((prev) => {
      if (!name) {
        return { login: false, registration: false };
      }
      return { login: false, registration: false, [name]: !prev[name] };
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
        <Header
          handleOpenForm={() => handleClickOpenForm('login')}
          handleLogOut={onClickLogOut}
        />
        <div className={styles.wrapper}>
          <Switch>
            <Route path="/" exact>
              <About />
              <Articles />
            </Route>

            <LoginRoute path="/profile" exact={true}>
              <Profile />
            </LoginRoute>

            <LoginRoute path="/create-article" exact={true}>
              <CreateArticle />
              <Articles />
            </LoginRoute>

            <Route>
              <h1>Страница не найдена.</h1>
            </Route>
          </Switch>

          <LoginForm />
          <RegistrationForm />
        </div>
        <Menu handleClickLogout={onClickLogOut} />
      </div>
    </formContextProvider.Provider>
  );
}
