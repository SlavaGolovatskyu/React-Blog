const initialState = {
  fullName: window.localStorage.getItem('fullName') || '',
  createdAt: window.localStorage.getItem('createdAt') || '',
  userId: window.localStorage.getItem('_id') || '',
  isAuth: convertStringToBool('isAuth'),
};

function convertStringToBool(item) {
  return window.localStorage.getItem(item) ? true : false;
}

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN':
    case 'REGISTRATION':
      return {
        fullName: window.localStorage.getItem('fullName'),
        createdAt: window.localStorage.getItem('createdAt'),
        userId: window.localStorage.getItem('_id'),
        isAuth: convertStringToBool('isAuth'),
      };

    case 'SET_USER_DATA':
      return {
        ...state,
        posts: action.payload.posts,
        comments: action.payload.comments,
      };

    case 'LOG_OUT':
      return { ...state, isAuth: false };

    default:
      return state;
  }
}
