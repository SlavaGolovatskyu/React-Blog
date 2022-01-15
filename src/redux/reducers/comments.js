const initialState = {
  totalComments: 0,
  comments: [],
};

export function commentsReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_COMMENTS':
      return {
        totalComments: action.payload.totalComments,
        comments: action.payload.comments,
      };

    case 'DELETE_COMMENT':
      return {
        ...state,
        comments: state.comments.filter((comment) => comment._id !== action.payload),
      };

    case 'EDIT_COMMENT':
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment._id === action.payload.id) {
            return {
              ...comment,
              text: action.payload.text,
            };
          }
          return comment;
        }),
      };

    case 'CLEAR_COMMENTS':
      return initialState;

    default:
      return state;
  }
}
