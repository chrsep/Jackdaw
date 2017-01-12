// @flow
export const CHANGE_TOKEN = 'CHANGE_TOKEN'

export function changeToken(token: string) {
  return {
    type: CHANGE_TOKEN,
    token
  }
}
