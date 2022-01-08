import { instance } from '../config/axios';

export const getCommentsFromPost = async (postId, userId = '', page = 1, limit = 5, orderBy = 'desc') => {
  const getCommentsURL = `/comments/post/${postId}?page=${page}&limit=${limit}&orderBy=${orderBy}&userId=${userId}`;
  try {
    const { data } = await instance.get(getCommentsURL);
    data.page = page;
    return data;
  } catch (e) {
    return false;
  }
};
