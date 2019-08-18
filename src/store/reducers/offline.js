const offlineReducerDefaultState = [];

export default (state = offlineReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_OFFLINE_MESSAGE':
      return [
        ...state,
        action.offline
      ];
    case 'CLEAR_OFFLINE_STORE':
      return [];
    default:
      return state;
  }
};
