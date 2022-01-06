import { instance } from "../../config/axios";
import setLocalStorageItems from "../../utils/setLocalStorageItems";

async function getUserById(id) {
  const getUserURL = `users/${id}`;
  try {
    const { data } = await instance.get(getUserURL);
    window.localStorage.setItem("createdAt", data.createdAt);
  } catch (e) {
    console.log(e);
  }
}

export const Login = (email, password) => async (dispatch) => {
  const loginURL = "auth/login";
  try {
    const { data } = await instance.post(loginURL, { email, password });

    if (data.token) {
      setLocalStorageItems(data);
      await getUserById(data._id);

      dispatch({
        type: "LOGIN",
      });
    }
  } catch (e) {
    console.log(e.data);
  }
};

export const Registration = (fullName, email, password) => async (dispatch) => {
  const registrationURL = "auth/register";
  try {
    const { data } = await instance.post(registrationURL, {
      fullName,
      email,
      password,
    });

    if (data.token) {
      setLocalStorageItems(data);

      dispatch({
        type: "REGISTRATION",
      });
    }
  } catch (e) {
    console.log(e.data);
  }
};

export const Logout = () => {
  return {
    type: "LOG_OUT",
  };
};
