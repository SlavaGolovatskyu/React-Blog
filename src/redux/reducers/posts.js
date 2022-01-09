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

    case 'CLEAR':
      return initialState;

    default:
      return state;
  }
}
