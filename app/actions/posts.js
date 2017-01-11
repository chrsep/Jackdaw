// @flow
export const ADD_POST = 'ADD_POST'

export function addPost(filenames: string[]) {
  return {
    type: ADD_POST,
    filenames
  }
}
