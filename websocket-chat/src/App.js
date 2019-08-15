import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { addMessage } from './store/actions/messages';
import { sortByDate } from './store/actions/filters'
import MessageInput from './components/MessageInput/MessageInput';
import MessageList from './components/MessageList/MessageList';
// import NickInput from './components/NickInput/NickInput';
import './App.css';

const store = configureStore();
const socket = new WebSocket('ws://st-chat.shas.tel');

socket.onmessage = function(event) {
  const messages = JSON.parse(event.data);
  messages.slice(-100).forEach((message) => {
    store.dispatch(addMessage({ ...message }));
  });
  store.dispatch(sortByDate());
}

function App() {
  return (
    <Provider store={store}>
      <MessageList socket={socket}/>
      <MessageInput socket={socket}/>
      {/* <NickInput /> */}
    </Provider>
  );
}

export default App;
