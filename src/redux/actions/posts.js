import { getArticles } from '../../services/articles';

export const postsAction =
  (userId = '') =>
  async (dispatch) => {
    const data = await getArticles(userId);
    if (Array.isArray(data)) {
      dispatch({ type: 'CLEAR' });
    } else {
      dispatch({ type: 'SET_POSTS', payload: { totalPosts: data.total, posts: data.items, currentPage: data.page } });
    }
  };
