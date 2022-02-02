import React from 'react';
import getUserById from '../services/user';
import { Route, Redirect, useHistory } from 'react-router-dom';

export function LoginRoute({ children, path, exact = false }) {
  const id = window.localStorage.getItem('_id');
  const token = window.localStorage.getItem('token');

  const history = useHistory();

  return (
    <Route
      path={path}
      exact={exact}
      render={() => {
        if (token && id) {
          const result = (async () => {
            const res = await getUserById(id);
            return !res ? false : true;
          })();
          if (result) {
            return children;
          }
          history.push('/');
        }
        return <Redirect to="/" />;
      }}
    />
  );
}
