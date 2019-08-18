import { createStore, combineReducers } from 'redux';
import messagesReducer from './reducers/messages';
import filtersReducer from './reducers/filters';
import offlineReducer from './reducers/offline';

export default () => {
  const store = createStore(
    combineReducers({
      messages: messagesReducer,
      filters: filtersReducer,
      offline: offlineReducer,
    })
  );
  return store;
};
