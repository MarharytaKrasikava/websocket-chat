const messagesReducerDefaultState = [];

export default (state = messagesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return [
        ...state,
        action.message
      ];
    /* case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates
          }
        } else {
          return expense;
        }
      })
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => id !== action.id); */
    default:
      return state;
  }
};