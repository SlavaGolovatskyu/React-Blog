import { instance } from '../config/axios';

export const getArticles = async (userId = '', query = '', page = 1, limit = 5, orderBy = 'desc') => {
  // backend default count 5
  // limit 5
  const getArticlesURL = `posts?page=${page}&limit=${limit}&orderBy=${orderBy}&userId=${userId}&query=${query}`;
  try {
    const { data } = await instance.get(getArticlesURL);
    data.page = page;
    return data;
  } catch (e) {
    return [];
  }
};
