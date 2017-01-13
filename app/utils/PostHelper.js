// @flow
export default class PostHelper {
  extractName = (item: string) => item.substring(11).split('-').join(' ').replace('.markdown', '')
  extractContents = (string: string) => atob(string).split('---')[2].substr(1)
  extractCategories = (string: string) => atob(string).split('---')[1].split('categories:')[1].substr(1)
}
