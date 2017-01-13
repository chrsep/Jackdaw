// @flow
import fm from 'front-matter'
import moment from 'moment'

export default class PostHelper {
  extractData = (string: string) => fm(atob(string))
  extractName = (item: string) => item.substring(11).split('-').join(' ').replace('.markdown', '')
  composeFile = (date: Date, title: string, categories: string, content: string) =>
    (
      btoa(
        `---\nlayout: post\ntitle: "${title}"\ndate: ${moment(date).format('YYYY-MM-DD HH:mm:SS ZZ')}\ncategories: ${categories}\n---\n${content}\n`
      )
    )
  generateCompleteFilename = (date: Date, title: string) => `_posts/${moment(date).format('YYYY-MM-DD')}-${title.toLowerCase().replace(/[^\w\s]/gi, '').replace(/ /g, '-')}.markdown`
}

