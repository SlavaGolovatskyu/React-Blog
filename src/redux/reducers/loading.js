const initialState = {
  isLoading: false,
  posts: false,
  comments: false,
};

export function loadingReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        [action.payload.name]: action.payload.loading,
      };

    default:
      return state;
  }
}
