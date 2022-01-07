const initialState = {
  fullName: window.localStorage.getItem('fullName') || '',
  createdAt: window.localStorage.getItem('createdAt') || '',
  userId: window.localStorage.getItem('_id') || '',
  isAuth: window.localStorage.getItem('isAuth') || false,
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN':
    case 'REGISTRATION':
      return {
        fullName: window.localStorage.getItem('fullName'),
        createdAt: window.localStorage.getItem('createdAt'),
        userId: window.localStorage.getItem('_id'),
        isAuth: window.localStorage.getItem('isAuth'),
      };

    case 'LOG_OUT':
      return {
        fullName: '',
        createdAt: '',
        userId: '',
        isAuth: false,
      };

    default:
      return state;
  }
}
