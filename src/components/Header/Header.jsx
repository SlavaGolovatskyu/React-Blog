import React from 'react';
import { useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';
import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';
import styles from './index.module.scss';

const Header = ({ handleOpenForm, handleLogOut }) => {
  const isOpen = 'isOpen';
  const [state, setState] = React.useState({
    isOpen: false,
    inputValue: '',
  });

  const isAuth = useSelector((state) => state.user.isAuth);

  const handleChangeState = (e = false, name, values = null) => {
    setState((prev) => {
      const value = e ? e.target.value : values;
      if (name === isOpen && !prev.isOpen) {
        return {
          inputValue: '',
          [name]: value,
        };
      }
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <div className={styles.search__article}>
      {/* Если поисковик открыт */}
      {state.isOpen && (
        <div className={styles.position__relative}>
          <input
            className={styles.search__input}
            placeholder="Поиск статьи по заголовку или тексту..."
            value={state.inputValue}
            onChange={(e) => handleChangeState(e, 'inputValue')}
            autoFocus
          />
          <Tooltip title="Закрыть" arrow>
            <CloseIcon
              onClick={() => handleChangeState(false, isOpen, false)}
              className={styles.search__close}
            />
          </Tooltip>
        </div>
      )}

      {/* Если поисковик закрыт */}
      {!state.isOpen && (
        <>
          <div className={styles.blog__name}>Slavik Blog</div>
          <div className={styles.blog__search_and_login}>
            <Tooltip title="Найти" arrow>
              <SearchIcon
                onClick={() => handleChangeState(false, isOpen, true)}
                className={styles.blog__icon}
              />
            </Tooltip>

            {isAuth && (
              <>
                <Tooltip title="Написать" arrow>
                  <CreateIcon className={styles.blog__icon} />
                </Tooltip>
                <Tooltip title="Выход" arrow>
                  <LogoutIcon onClick={handleLogOut} className={styles.blog__icon} />
                </Tooltip>
              </>
            )}

            {!isAuth && (
              <Tooltip title="Войти" arrow>
                <PersonIcon onClick={handleOpenForm} className={styles.blog__icon} />
              </Tooltip>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
