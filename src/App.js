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
    // console.log(messages);
    if (messages.length > 1) { // messages came in a bundle, take only last 100 to the store
      store.dispatch(addMessageArray({messages: messages.sort((a, b) => (a.time > b.time ? 1 : -1)).slice(-100)}))
    } else { // messages come by one:
      store.dispatch(addMessage({ ...messages[0] }));
    }

    const storedMessages = store.getState().messages; //remove extra messages when > 100 in store
    if (storedMessages.length > 100) {
      store.dispatch(removeMessage({id: storedMessages[0].id}));
    }
    if (document.hidden) {
      if (Date.now() - messages[messages.length - 1].time < 2000 ) { // add notification about the latest (< 2 seconds ago) message
        notify(messages[messages.length - 1]);                        // when the app is hidden
      }
    }

  } else { // if messages came with error, pass error message
    store.dispatch(addMessage());
  }
}

function App() {
  return (
    <Provider store={store}>
      <header className='header'>
        <h1>Welcome to Websocket Chat!</h1>
      </header>
      <MessageList />
      <MessageInput socket={socket} />
      <footer>
        <p>&copy; by HolyDaizy</p>
      </footer>
    </Provider>
  );
}

export default App;
