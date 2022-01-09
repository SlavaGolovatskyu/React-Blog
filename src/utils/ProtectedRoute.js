import React from 'react';
import getUserById from '../services/user';
import { Route, Redirect, useHistory } from 'react-router-dom';

export function LoginRoute({ children, path, exact = false }) {
  const id = window.localStorage.getItem('_id');
  const token = window.localStorage.getItem('token');

  const history = useHistory();

  React.useEffect(() => {
    getUserById(id)
      .then((res) => {
        // if id is not valid
        if (!res) {
          history.push('/');
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <Route
      path={path}
      exact={exact}
      render={() => {
        if (token) {
          return children;
        }
        return <Redirect to="/" />;
      }}
    />
  );
}
