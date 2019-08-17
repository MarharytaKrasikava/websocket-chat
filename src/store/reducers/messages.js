const messagesReducerDefaultState = [];

export default (state = messagesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return [
        ...state,
        action.message
      ];
    case 'ADD_MESSAGE_ARRAY': {
      return action.messages;
    }
    case 'REMOVE_MESSAGE':
      return state.filter(({ id }) => (id !== action.id));
    case 'CLEAR_STORE':
      return [];
    default:
      return state;
  }
};
