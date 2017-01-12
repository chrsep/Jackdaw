// @flow
import { REFRESH_PROJECT, CHOOSE_PROJECT } from '../actions/gitlab'

const initialState = { projects: [], chosenProject: 0 }

export default function gitlab(
  state: {
    projects: {name: string, id: number}[],
    chosenProject: number
  } = initialState, action: Object) {
  switch (action.type) {
    case REFRESH_PROJECT:
      return { projects: action.projects, chosenProject: state.chosenProject }
    case CHOOSE_PROJECT:
      return { projects: state.projects, chosenProject: action.projectIndex }
    default:
      return state
  }
}
