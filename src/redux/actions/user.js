export const Login = (email, password) => {
  return {
    type: "LOGIN",
    payload: { email, password },
  };
};

export const Registration = (fullName, email, password) => {
  return {
    type: "REGISTRATION",
    payload: { fullName, email, password },
  };
};

export const Logout = () => {
  return {
    type: "LOGOUT",
  };
};
