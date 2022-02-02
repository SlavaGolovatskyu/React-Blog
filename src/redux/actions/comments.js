import { instance } from '../../config/axios';
import { setLoading } from './loading';

export const getHeaders = (params = {}) => {
  return {
    headers: { Authorization: window.localStorage.getItem('token'), ...params },
  };
};

export const addComment = (comment) => ({ type: 'ADD_COMMENT', payload: comment });

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

    dispatch(setLoading('comments', true));
    try {
      const { data } = await instance.get(getCommentsURL);
      console.log(data);
      if (data.items && data.total) {
        dispatch(setComments(data.total, data.items));
      } else {
        dispatch(setComments(data.length, data.reverse()));
      }
    } catch (e) {
      dispatch({ type: 'CLEAR_COMMENTS' });
    } finally {
      dispatch(setLoading('comments', false));
    }
  };

export const addCommentRequest = (text, postId) => async (dispatch) => {
  const url = 'comments';
  try {
    // take the main information
    const { data } = await instance.post(
      url,
      { text: text, postId: postId },
      getHeaders(),
    );
    // request return just user id. We don't want again make request for the user id
    // we lack user fullName's
    data.user = { fullName: window.localStorage.getItem('fullName') };
    dispatch(addComment(data));
  } catch (e) {
    console.warn(e);
    alert('Произошла ошибка при создании коментария');
  }
};

export const deleteCommentRequest = (id) => async (dispatch) => {
  const url = `comments/${id}`;
  try {
    await instance.delete(url, getHeaders());
    dispatch(deleteComment(id));
  } catch (e) {
    alert(e);
  }
};

export const editCommentRequest = (text, id) => async (dispatch) => {
  const url = `comments/${id}`;
  try {
    await instance.patch(url, { text: text }, getHeaders());
    dispatch(editComment(text, id));
  } catch (e) {
    alert(e);
  }
};
