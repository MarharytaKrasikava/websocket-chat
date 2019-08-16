const filtersReducerDefaultState = {
  sortBy: 'date',
  user: '',
};

export default (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date',
      }
    default:
      return state;
    }
  }
