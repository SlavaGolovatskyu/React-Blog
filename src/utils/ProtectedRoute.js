import { Route, Redirect } from 'react-router-dom';

export function LoginRoute({ children, path, exact = false }) {
  const id = window.localStorage.getItem('_id');
  const token = window.localStorage.getItem('token');

  return (
    <Route
      path={path}
      exact={exact}
      render={() => {
        if (id && token) {
          return children;
        }
        return <Redirect to="/" />;
      }}
    />
  );
}
