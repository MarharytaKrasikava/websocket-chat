export const addMessage = ({
  time = '',
  id = '',
  from = '',
  message = '',
} = {}) => ({
  type: 'ADD_MESSAGE',
  message: {
    from,
    message,
    id,
    time,
  }
});

export const addMessageArray = ({messages} = {}) => ({
  type: 'ADD_MESSAGE_ARRAY',
  messages
})

export const removeMessage = ({id} = {}) => ({
  type: 'REMOVE_MESSAGE',
  id
});

export const clearStore = () => ({
  type: 'CLEAR_STORE',
});
