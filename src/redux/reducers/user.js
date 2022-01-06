const initialState = {
  fullName: "",
  createdAt: "",
  token: "",
  userId: "",
  isAuth: false,
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN":
      return;

    case "LOGOUT":
      return initialState;

    default:
      return state;
  }
}
