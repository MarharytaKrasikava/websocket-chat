import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { addMessage } from './store/actions/messages';
import { addMessageArray } from './store/actions/messages';
import { removeMessage } from './store/actions/messages';
import notify from './components/Notifications/Notifications';
import MessageInput from './components/MessageInput/MessageInput';
import MessageList from './components/MessageList/MessageList';
import ReconnectingWebSocket from 'reconnectingwebsocket';
import './App.css';

const store = configureStore();
const socket = new ReconnectingWebSocket('wss://wssproxy.herokuapp.com/', null, { debug: false, reconnectInterval: 3000 });

socket.onmessage = function (event) {
  const messages = JSON.parse(event.data);

  if (messages.length) { // if messages came without error

    if (messages.length > 1) { // messages came in a bundle, take only last 100 to the store
      store.dispatch(addMessageArray({messages: messages.sort((a, b) => (a.time > b.time ? 1 : -1)).slice(-100)}))
    } else { // messages come by one:
      const storedMessages = store.getState().messages; // chek for spam
      if (!(storedMessages[storedMessages.length - 1].message === messages[0].message
        && storedMessages[storedMessages.length - 1].from === messages[0].from
        && storedMessages[storedMessages.length - 1].time+1 === messages[0].time)) {
          store.dispatch(addMessage({ ...messages[0] }));
        }
    }

    const storedMessages = store.getState().messages; //remove extra messages when > 100 in store
    if (storedMessages.length > 100) {
      store.dispatch(removeMessage({id: storedMessages[0].id}));
    }
    if (document.hidden) { // add notification when page is hidden
      notify(messages[messages.length - 1]);
    }

  } else { // if messages came with error, pass error message
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
