import React from "react";
import { useSelector } from "react-redux";
import { Switch, Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { formContextProvider } from "../../context/formContext";
import dateToLocaleString from "../../utils/dateToLocaleString";
import styles from "./index.module.scss";

function ButtonMenu() {
  return (
    <Typography
      sx={{ letterSpacing: "5px" }}
      variant="h6"
      color="inherit"
      component="div"
    >
      меню
    </Typography>
  );
}

function ListGenerate({ name, href = false, ...props }) {
  return (
    <li {...props}>
      <Link to={href ? href : "/"}>{name}</Link>
    </li>
  );
}

export default function Menu({ handleLogOut }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const {
    fullName,
    createdAt: created,
    isAuth,
  } = useSelector((state) => state.user);

  const accountCreated = dateToLocaleString(created);

  // this function call popmenu for log in or registration
  // handleClick('login') for example
  const { handleClick } = React.useContext(formContextProvider);

  const openModalWindow = (name) => {
    handleClick(name);
    setIsOpen(false);
  };

  return (
    <div className={styles.menu}>
      <div
        className={
          styles.menu__fixed + " " + (isOpen ? styles.menu__open : null)
        }
      >
        {isOpen && (
          <div className={styles.menu__container}>
            <div className={styles.menu__profile}>
              {isAuth && (
                <>
                  <h3 className={styles.user__name}>{fullName}</h3>
                  <h5 className={styles.user__createdAt}>
                    Дата регистрации: {accountCreated}
                  </h5>

                  <ul className={styles.link__items}>
                    <ListGenerate
                      name="Главная"
                      className={styles.link__item}
                    />
                    <ListGenerate
                      name="Мой профиль"
                      className={styles.link__item}
                    />
                    <ListGenerate
                      name="Создать запись"
                      className={styles.link__item}
                    />
                    <ListGenerate
                      onClick={handleLogOut}
                      name="Выйти"
                      className={styles.link__item}
                    />
                  </ul>
                </>
              )}

              {!isAuth && (
                <ul className={styles.link__items}>
                  <ListGenerate
                    name="Войти"
                    className={styles.link__item}
                    onClick={() => openModalWindow("login")}
                  />
                  <ListGenerate
                    name="Зарегистрироваться"
                    className={styles.link__item}
                    onClick={() => openModalWindow("registration")}
                  />
                </ul>
              )}
            </div>

            <div className={styles.menu__close}>
              <CloseIcon
                className={styles.menu__icon_close}
                sx={{ cursor: "pointer" }}
                onClick={() => setIsOpen(false)}
              />
              <ButtonMenu />
            </div>
          </div>
        )}

        {!isOpen && (
          <Toolbar variant="dense">
            <IconButton
              onClick={() => setIsOpen(true)}
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 1, width: "40px", height: "40px" }}
            >
              <MenuIcon className={styles.menu__icon} />
            </IconButton>
            <ButtonMenu />
          </Toolbar>
        )}
      </div>
    </div>
  );
}
