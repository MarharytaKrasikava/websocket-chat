export const sortByDate = () => ({
  type: 'SORT_BY_DATE',
});

export const setUserFilter = (user = '') => ({
  type: 'SET_USER',
  user
});