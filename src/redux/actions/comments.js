import { instance } from '../../config/axios';
import { setLoading } from './loading';

export const setComments = (total, comments) => {
  return {
    type: 'SET_COMMENTS',
    payload: { totalComments: total, comments: comments },
  };
};

export const deleteComment = (id) => {
  return {
    type: 'DELETE_COMMENT',
    payload: id,
  };
};

export const editComment = (text, id) => {
  return {
    type: 'EDIT_COMMENT',
    payload: { id: id, text: text },
  };
};

export const commentsAction =
  (postId = '', userId = '', query = '', page = 1, limit = 5, orderBy = 'desc') =>
  async (dispatch) => {
    const params = `?userId=${userId}&query=${query}&page=${page}&limit=${limit}&orderBy=${orderBy}`;
    const usersComments = `comments${params}`;
    const postComments = `comments/post/${postId}${params}`;
    const getCommentsURL = postId ? postComments : usersComments;

    dispatch(setLoading('commentsLoading', true));
    try {
      const { data } = await instance.get(getCommentsURL);
      dispatch(setComments(data.total, data.items));
    } catch (e) {
      dispatch({ type: 'CLEAR_COMMENTS' });
    } finally {
      dispatch(setLoading('commentsLoading', false));
    }
  };

export const deleteCommentRequest = (id) => async (dispatch) => {
  const url = `comments/${id}`;
  try {
    await instance.delete(url, {
      headers: { Authorization: window.localStorage.getItem('token') },
    });
    dispatch(deleteComment(id));
  } catch (e) {
    console.log(e);
  }
};

export const editCommentRequest = (text, id) => async (dispatch) => {
  const url = `comments/${id}`;
  try {
    await instance.patch(
      url,
      { text: text },
      {
        headers: { Authorization: window.localStorage.getItem('token') },
      },
    );
    dispatch(editComment(text, id));
  } catch (e) {
    console.log(e);
  }
};
