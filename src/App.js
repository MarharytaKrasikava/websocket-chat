import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { addMessage } from './store/actions/messages';
import { sortByDate } from './store/actions/filters'
import MessageInput from './components/MessageInput/MessageInput';
import MessageList from './components/MessageList/MessageList';
import ReconnectingWebSocket from 'reconnectingwebsocket';
import './App.css';

const store = configureStore();
const socket = new ReconnectingWebSocket('wss://wssproxy.herokuapp.com/', null, { debug: false, reconnectInterval: 3000 });

socket.onmessage = function(event) {
  const messages = JSON.parse(event.data);
  let lastMessages;
  if (messages[0].time > messages[messages.length - 1].time) {
    lastMessages = messages.slice(0, 99);
  } else { lastMessages = messages.slice(-100); }
  lastMessages.forEach((message) => {
    store.dispatch(addMessage({ ...message }));
  });
  store.dispatch(sortByDate());
}

function App() {
  return (
    <Provider store={store}>
      <MessageList />
      <MessageInput socket={socket} />
    </Provider>
  );
}

export default App;
