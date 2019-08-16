import icon from './favicon.ico';

export default (message) => {
  Notification.requestPermission().then(function(result) {
    if ((result === 'granted') && message){
      const options = {
        body: `from: ${message.from}`,
        icon: icon,
      };
      new Notification(message.message, options);
    }
  });
}
