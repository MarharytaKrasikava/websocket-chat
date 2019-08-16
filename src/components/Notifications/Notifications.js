export default (message) => {
  Notification.requestPermission().then(function(result) {
    if ((result === 'granted') && message){
      const options = {
        body: `from: ${message.from}`,
      };
      new Notification(message.message, options);
    }
  });
}
