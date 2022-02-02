const initialState = {
  totalItems: 0,
  items: [],
};

export function postsReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_POSTS':
      return {
        totalItems: action.payload.totalPosts,
        items: action.payload.posts,
      };

    case 'DELETE_POST':
      return {
        totalItems: state.totalItems - 1,
        items: state.items.filter((post) => post._id !== action.payload),
      };

    case 'CLEAR_POSTS':
      return initialState;

    default:
      return state;
  }
}
