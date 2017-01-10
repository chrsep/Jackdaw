// @flow
export const ADD_POST = 'ADD_POST';

export function addPost(filename: string) {
  return {
    type: ADD_POST,
    filename
  };
}
