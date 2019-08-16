import React from 'react';
import { Provider } from 'react-redux';
import ReconnectingWebSocket from 'reconnectingwebsocket';
import configureStore from './store/configureStore';
import { addMessage } from './store/actions/messages';
import { removeMessage } from './store/actions/messages';
import { sortByDate } from './store/actions/filters'
import MessageInput from './components/MessageInput/MessageInput';
import MessageList from './components/MessageList/MessageList';
import notify from './components/Notifications/Notifications';
import './App.css';

const store = configureStore();
const socket = new ReconnectingWebSocket('wss://wssproxy.herokuapp.com/', null, { debug: false, reconnectInterval: 3000 });

socket.onmessage = function (event) {
  const messages = JSON.parse(event.data);
  let lastMessages;
  if (messages.length) {

    if (messages[0].time > messages[messages.length - 1].time) { //выделяем последние 100 сообщений
      lastMessages = messages.slice(0, 99);
    } else { lastMessages = messages.slice(-100); }
    lastMessages.forEach((message) => {
      store.dispatch(addMessage({ ...message }));
    });

    store.dispatch(sortByDate());

    const storedMessages = store.getState().messages; //не даем store переполняться
    if (storedMessages.length >= 100) {
      store.dispatch(removeMessage({id: storedMessages[0].id}));
    }

  } else {
    store.dispatch(addMessage());
  }
  console.log(document.hidden)
  if (document.hidden) {
    const messages = store.getState().messages;
    notify(messages[messages.length - 1]);
    console.log(messages[messages.length - 1]);
  }
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
