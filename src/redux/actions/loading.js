export const loadingAction = (isLoading) => {
  return {
    type: 'SET_LOADING',
    payload: isLoading,
  };
};
