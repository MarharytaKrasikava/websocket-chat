import { createStore, combineReducers } from 'redux';
import messagesReducer from './reducers/messages';
import filtersReducer from './reducers/filters';

export default () => {
  const store = createStore(
    combineReducers({
      messages: messagesReducer,
      filters: filtersReducer,
    })
  );
  return store;
};