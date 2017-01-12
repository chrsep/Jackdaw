// @flow
export const REFRESH_PROJECT = 'REFRESH_PROJECT'
export const CHOOSE_PROJECT = 'CHOOSE_PROJECT'

export function refreshProject(projects: Object[]) {
  return {
    type: REFRESH_PROJECT,
    projects
  }
}

export function chooseProject(projectIndex: number) {
  return {
    type: CHOOSE_PROJECT,
    projectIndex
  }
}
