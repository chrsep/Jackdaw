// @flow

import _ from 'lodash/core'
import { REFRESH_PROJECT, CHOOSE_PROJECT } from '../actions/gitlab'

const initialState = { projects: [], chosenProject: 0 }

export default function gitlab(
  state: {
    projects: {name: string, id: number}[],
    chosenProject: number
  } = initialState, action: Object) {
  switch (action.type) {
    case REFRESH_PROJECT:
      return _.assignIn(state, { projects: action.projects })
    case CHOOSE_PROJECT:
      return _.assignIn(state, { chosenProject: action.projectIndex })
    default:
      return state
  }
}
