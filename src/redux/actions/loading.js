export const setLoading = (name, bool) => {
  return {
    type: 'SET_LOADING',
    payload: { name: name, loading: bool },
  };
};
