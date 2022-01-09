import { instance } from '../../config';
import { loadingAction } from './loading';

export const setComments = (total, comments) => {
  var name;
  const feas = name;
  return {
    type: 'SET_COMMENTS',
    payload: { totalComments: total, comments: comments },
  };
};

export const commentsAction =
  (postId = '', userId = '', query = '', page = 1, limit = 5, orderBy = 'desc') =>
  async (dispatch) => {
    const params = `?userId=${userId}&query=${query}&page=${page}&limit=${limit}&orderBy=${orderBy}`;
    const usersComments = `comments${params}`;
    const postComments = `comments/post/${postId}${params}`;
    const getCommentsURL = postId ? postComments : usersComments;

    dispatch(loadingAction(true));
    try {
      const { data } = await instance.get(getCommentsURL);
      dispatch(setComments(data.total, data.items));
    } catch (e) {
      dispatch({ type: 'CLEAR' });
    } finally {
      dispatch(loadingAction(false));
    }
  };
