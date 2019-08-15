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
  const messages = JSON.parse(event.data).slice(0, 100);
  messages.forEach((message) => {
    store.dispatch(addMessage({ ...message }));
  });
  store.dispatch(sortByDate());
}

function App() {
  return (
    <Provider store={store}>
      <MessageList socket={socket}/>
      <MessageInput socket={socket}/>
    </Provider>
  );
}

export default App;
