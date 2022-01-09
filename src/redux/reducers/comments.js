const initialState = {
  totalComments: 0,
  comments: [],
};

export function commentsReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_COMMENTS':
      return { totalComments: action.payload.totalComments, comments: action.payload.comments };

    case 'CLEAR':
      return initialState;

    default:
      return state;
  }
}
