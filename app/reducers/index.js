// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import counter from './counter';
import posts from './posts';
import token from './token';
import gitlab from './gitlab';

const rootReducer = combineReducers({
  gitlab,
  token,
  posts,
  counter,
  routing
});

export default rootReducer;
