import React from 'react';
import Input from './components/MessageInput/MessageInput';
import MessageList from './components/MessageList/MessageList';

import './App.css';

function App() {
  let socket = new WebSocket('ws://st-chat.shas.tel');
  let fullMessageArray = [];
  let messageArray = [];

  socket.onmessage = function(event) {
    messageArray = JSON.parse(event.data);
    fullMessageArray = fullMessageArray.concat(messageArray);
    console.log(messageArray);
    console.log(fullMessageArray);
  };;
  
  return (
    <>
      <Input socket={socket}/>
      <MessageList messages={fullMessageArray.slice(-100)}/>           
    </>
  );
}

export default App;
