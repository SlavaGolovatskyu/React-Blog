const initialState = {
  totalPosts: 0,
  posts: [],
  currentPage: 1,
};

export function postsReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_POSTS':
      return {
        totalPosts: action.payload.totalPosts,
        posts: action.payload.posts,
        currentPage: action.payload.currentPage,
      };

    case 'CLEAR':
      return initialState;

    default:
      return state;
  }
}
