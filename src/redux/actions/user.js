import { instance } from '../../config/axios';
import getUserById from '../../services/user';
import setLocalStorageItems from '../../utils/setLocalStorageItems';

export const login = (email, password, setError) => async (dispatch) => {
  const loginURL = 'auth/login';
  try {
    const { data } = await instance.post(loginURL, { email, password });

    if (data.token) {
      setLocalStorageItems(data, true);
      const { createdAt } = await getUserById(data._id);
      window.localStorage.setItem('createdAt', createdAt);

      dispatch({
        type: 'LOGIN',
      });
    }
  } catch (e) {
    if (e.response) {
      const { status, data } = e.response;
      if (status === 404) {
        setError('email', { message: data.error });
      }
      if (status === 400) {
        setError('password', { message: data.error });
      }
    }
  }
};

export const registration = (fullName, email, password, setError) => async (dispatch) => {
  const registrationURL = 'auth/register';
  try {
    const { data } = await instance.post(registrationURL, {
      fullName,
      email,
      password,
    });

    if (data.token) {
      setLocalStorageItems(data, true);

      dispatch({
        type: 'REGISTRATION',
      });
    }
  } catch (e) {
    if (e.response) {
      const { status, data } = e.response;
      if (status === 500 || status === 400) {
        setError('email', { message: data.error });
      }
    }
  }
};

export const logout = () => {
  return {
    type: 'LOG_OUT',
  };
};
