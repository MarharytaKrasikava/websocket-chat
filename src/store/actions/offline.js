export const addOfflineMessage = ({
  from = '',
  message = '',
} = {}) => {
  return ({
  type: 'ADD_OFFLINE_MESSAGE',
  offline: {
    from,
    message,
  }
})
};


export const clearOfflineStore = () => ({
  type: 'CLEAR_OFFLINE_STORE',
});
