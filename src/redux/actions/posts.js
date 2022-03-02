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

    dispatch(setLoading('posts', true));
    try {
      // make requests for receive articles
      const { data } = await instance.get(getArticlesURL);
      if (data.items) {
        // set data if not errors
        dispatch(setPosts(data.total, data.items));
      }
    } catch (e) {
      dispatch({ type: 'CLEAR_POSTS' });
    } finally {
      dispatch(setLoading('posts', false));
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
    alert(e);
  }
};

export const createPost = async (title, text, photoUrl) => {
  await instance.post(
    'posts',
    {
      title: title,
      text: text,
      photoUrl: photoUrl,
    },
    { headers: { Authorization: window.localStorage.getItem('token') } },
  );
};

export const editPost = async (id, title, text, photoUrl) => {
  await instance.patch(
    `posts/${id}`,
    { title: title, text: text, photoUrl: photoUrl },
    { headers: { Authorization: window.localStorage.getItem('token') } },
  );
};
