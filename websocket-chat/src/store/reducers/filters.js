const filtersReducerDefaultState = {
  sortBy: 'date',
  user: '',
};

export default (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      }
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date',
      }
    default:
      return state;
    }
  }