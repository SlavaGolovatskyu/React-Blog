import React from "react";
import Menu from "../components/Menu/Menu";
import Header from "../components/Header/Header";
import About from "../components/AboutMe/About";
import Article from "../components/Article/Article";
import LoginForm from "../components/Forms/Login";
import RegistrationForm from "../components/Forms/Registration";
import { Logout } from "../redux/actions/user";
import { useDispatch } from "react-redux";
import styles from "./pages.module.scss";
import arthur from "../assets/myphoto.jpg";
import myPhoto from "../assets/IMG_0508.jpg";

import { formContextProvider } from "../context/formContext";

export default function MainPage() {
  const [formOpen, setFormOpen] = React.useState({
    login: false,
    registration: false,
  });

  const dispatch = useDispatch();

  const onClickLogOut = () => {
    localStorage.clear();
    dispatch(Logout());
  };

  const handleClickForm = (name = false) => {
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
    handleClick: handleClickForm,
  };

  return (
    <formContextProvider.Provider value={contextProvider}>
      <div className={styles.container}>
        <About />
        <div className={styles.header}>
          <div className={styles.head}>
            <Header
              handleOpenForm={() => handleClickForm("login")}
              handleLogOut={onClickLogOut}
            />
          </div>
          <div className={styles.articles}>
            <Article img={1} />
            <Article />
            <Article />
            <Article />
            <Article />
          </div>
        </div>
        <Menu handleLogOut={onClickLogOut} />
        <LoginForm />
        <RegistrationForm />
      </div>
    </formContextProvider.Provider>
  );
}
