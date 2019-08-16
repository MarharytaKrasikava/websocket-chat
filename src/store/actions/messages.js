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
