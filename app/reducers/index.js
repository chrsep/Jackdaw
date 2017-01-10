// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import counter from './counter';
import post from './post';
import token from './token';
import gitlab from './gitlab';

const rootReducer = combineReducers({
  gitlab,
  token,
  post,
  counter,
  routing
});

export default rootReducer;
