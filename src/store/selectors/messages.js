export default (messages, { user, sortBy }) => {
  return messages.filter((message) => {
    const userMatch = message.from.toLowerCase().includes(user.toLowerCase());
    return userMatch;
  }).sort((a, b) => {
     if (sortBy === 'date') {
       return a.time > b.time ? 1 : -1;
     } else return true;
  });
 };
