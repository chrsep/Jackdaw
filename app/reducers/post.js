// @flow
import _ from 'lodash/core';
import { ADD_POST } from '../actions/posts';

export default function token(state: string[] = [], action: Object) {
  switch (action.type) {
    case ADD_POST:
      return _.concat(state, action.filename);
    default:
      return state;
  }
}
