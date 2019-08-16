import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { addMessage } from './store/actions/messages';
import { removeMessage } from './store/actions/messages';
import { clearStore } from './store/actions/messages';
import notify from './components/Notifications/Notifications';
import MessageInput from './components/MessageInput/MessageInput';
import MessageList from './components/MessageList/MessageList';
import ReconnectingWebSocket from 'reconnectingwebsocket';
import './App.css';

const store = configureStore();
const socket = new ReconnectingWebSocket('wss://wssproxy.herokuapp.com/', null, { debug: false, reconnectInterval: 3000 });

socket.onmessage = function (event) {
  const messages = JSON.parse(event.data);

  if (messages.length) {
    if (messages.length > 1) {
      store.dispatch(clearStore())
      messages.sort((a, b) => (a.time > b.time ? 1 : -1)).slice(-100).forEach((message) => {
        store.dispatch(addMessage({ ...message }));
      });
    } else {
      store.dispatch(addMessage({ ...messages[0] }));
    }

    const storedMessages = store.getState().messages;
    if (storedMessages.length >= 100) {
      store.dispatch(removeMessage({id: storedMessages[0].id}));
    }
    if (document.hidden) {
      notify(messages[messages.length - 1]);
    }
  } else {
    store.dispatch(addMessage());
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
