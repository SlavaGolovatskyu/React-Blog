const initialState = {
  isLoading: false,
};

export function loadingReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { isLoading: action.payload };

    default:
      return state;
  }
}
