const messagesReducerDefaultState = [];

export default (state = messagesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return [
        ...state,
        action.message
      ];
    case 'REMOVE_MESSAGE':
      return state.filter(({ id }) => (id !== action.id));
    case 'CLEAR_STORE':
      return [];
    default:
      return state;
  }
};
