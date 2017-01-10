// @flow
export const ADD_PROJECT = 'ADD_PROJECT';

export function addProject(project: string) {
  return {
    type: ADD_PROJECT,
    project: project
  };
}
