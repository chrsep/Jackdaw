// @flow
import { CHANGE_TOKEN } from '../actions/token';

export default function files(state: string = '', action: Object) {
  switch (action.type) {
    case CHANGE_TOKEN:
      return action.token;
    default:
      return state;
  }
}
