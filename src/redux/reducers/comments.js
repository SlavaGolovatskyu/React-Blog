const initialState = {
  totalItems: 0,
  items: [],
};

export function commentsReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_COMMENTS':
      return {
        totalItems: action.payload.totalComments,
        items: action.payload.comments,
      };

    case 'DELETE_COMMENT':
      return {
        ...state,
        totalItems: state.totalItems - 1,
        items: state.items.filter((comment) => comment._id !== action.payload),
      };

    case 'EDIT_COMMENT':
      return {
        ...state,
        items: state.items.map((comment) => {
          if (comment._id === action.payload.id) {
            return {
              ...comment,
              text: action.payload.text,
            };
          }
          return comment;
        }),
      };

    case 'ADD_COMMENT':
      return {
        ...state,
        totalItems: state.totalItems + 1,
        items: [action.payload, ...state.items],
      };

    case 'CLEAR_COMMENTS':
      return { totalItems: 0, items: [] };

    default:
      return state;
  }
}
