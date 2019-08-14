import React from 'react';

export default function Input({ socket }) {
    const [message, setMessage] = React.useState({
        value: '',
    });
    function handleChange(event) {
        setMessage({value: event.target.value});
      }
    function sendMessage (event) {
        const outgoingMessage = JSON.stringify({
          from: 'HolyDaizy',
          message: message.value,
        });;
        socket.send(outgoingMessage);
        setMessage({value: ''});
        event.preventDefault();
      }
    return (
      <form name="publish" onSubmit={sendMessage}>
        <input type="text" name="message" value={message.value} onChange={handleChange}/>
        <input type="submit" value="Отправить" />
      </form>
    );
}