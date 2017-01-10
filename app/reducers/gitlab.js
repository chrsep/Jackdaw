// @flow
import _ from 'lodash/core';
import { ADD_PROJECT } from '../actions/gitlab';

export default function gitlab(state: string[] = [], action: Object) {
  switch (action.type) {
    case ADD_PROJECT:
      return _.concat(state, action.project);
    default:
      return state;
  }
}
