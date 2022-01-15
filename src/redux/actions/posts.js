import { instance } from '../../config/axios';
import { setLoading } from './loading';

export const setPosts = (total, items) => {
  return {
    type: 'SET_POSTS',
    payload: { totalPosts: total, posts: items },
  };
};

export const deletePost = (id) => {
  return {
    type: 'DELETE_POST',
    payload: id,
  };
};

export const postsAction =
  (userId = '', query = '', page = 1, limit = 5, orderBy = 'desc') =>
  async (dispatch) => {
    const getArticlesURL = `posts?page=${page}&limit=${limit}&orderBy=${orderBy}&userId=${userId}&query=${query}`;

    dispatch(setLoading('postsLoading', true));
    try {
      // make requests for receive articles
      const { data } = await instance.get(getArticlesURL);
      // set data if not errors
      dispatch(setPosts(data.total, data.items));
    } catch (e) {
      dispatch({ type: 'CLEAR_POSTS' });
    } finally {
      dispatch(setLoading('postsLoading', false));
    }
  };

export const deletePostRequest = (id) => async (dispatch) => {
  const url = `posts/${id}`;
  try {
    await instance.delete(url, {
      headers: { Authorization: window.localStorage.getItem('token') },
    });
    dispatch(deletePost(id));
  } catch (e) {
    console.log(e);
  }
};
