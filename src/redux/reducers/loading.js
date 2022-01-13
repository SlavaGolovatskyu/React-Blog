const initialState = {
  isLoading: false,
  postsLoading: false,
  commentsLoading: false,
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
