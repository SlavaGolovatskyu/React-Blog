import { instance } from '../../config/axios';
import getUserById from '../../services/userAPI';
import setLocalStorageItems from '../../utils/setLocalStorageItems';

function setLocalStorageUserData(data) {
  window.localStorage.setItem('createdAt', data.createdAt);
}

export const Login = (email, password, setError) => async (dispatch) => {
  const loginURL = 'auth/login';
  try {
    const { data } = await instance.post(loginURL, { email, password });

    if (data.token) {
      setLocalStorageItems(data, true);
      setLocalStorageUserData(await getUserById(data._id));

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

export const Registration = (fullName, email, password, setError) => async (dispatch) => {
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

export const Logout = () => {
  return {
    type: 'LOG_OUT',
  };
};

export const getUserByIdAction = (id) => async (dispatch) => {};
