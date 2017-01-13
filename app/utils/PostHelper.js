// @flow
export default class PostHelper {
  extractName = (item: string) => item.substring(11).split('-').join(' ').replace('.markdown', '')

}
