const initialState = {
  totalPosts: 0,
  posts: [],
};

export function postsReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_POSTS':
      return {
        totalPosts: action.payload.totalPosts,
        posts: action.payload.posts,
      };

    case 'DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };

    case 'CLEAR_POSTS':
      return initialState;

    default:
      return state;
  }
}
