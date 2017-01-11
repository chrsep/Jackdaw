// @flow
import _ from 'lodash/core'
import { ADD_POST } from '../actions/posts'

export default function token(state: string[] = [], action: Object) {
  switch (action.type) {
    case ADD_POST:
      return action.filenames
    default:
      return state
  }
}
