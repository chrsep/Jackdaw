// @flow
import React, { Component } from 'react'
import SimpleMDE from 'simplemde'
import styles from './Editor.css'
import PostHelper from '../utils/PostHelper'
import frontMatterExtractor from 'front-matter'

export default class Editor extends Component {
  constructor(props: Object) {
    super(props)
    this.state = {
      title: '',
      categories: '',
      content: '',
      date: new Date()
    }
    this.editor = undefined
  }
  state: {
    title: string,
    categories: string,
    content: string,
    date: Date
  }
  componentDidMount() {
    this.editor = new SimpleMDE({
      element: document.getElementById('editor'),
      spellChecker: false
    })
    this.editor.codemirror.on('change', () => this.handleContentChange(this.editor.value()))
  }
  componentWillReceiveProps(nextProps: Object) {
    if (this.props === nextProps) return
    if (nextProps.isNewPost && nextProps.isNewPost !== this.props.isNewPost) {
      this.setState({
        title: '',
        categories: '',
        date: new Date()
      })
      this.editor.value('')
    } else if (nextProps.postData.file_name !== undefined) {
      const data = frontMatterExtractor(atob(nextProps.postData.content))
      this.setState({
        title: data.attributes.title,
        categories: data.attributes.categories,
        date: new Date(data.attributes.date)
      })
      this.editor.value(data.body)
    }
  }
  handleTitleChange = (event: Object) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ title: event.target.value })
    }
  }
  handleCategoriesChange = (event: Object) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ categories: event.target.value })
    }
  }
  handleContentChange = (value: string) => {
    this.setState({ content: value })
  }
  handlePublishClick = () => {
    const { date, title, categories, content } = this.state
    const { gitlab, token, isNewPost, postData } = this.props
    const postHelper = new PostHelper()
    const encodedContent = postHelper.composeFile(date, title, categories, content)
    const filename = postHelper.generateCompleteFilename(date, title)
    const headers = new Headers({
      'PRIVATE-TOKEN': token
    })
    if (isNewPost) {
      const commitMessage = encodeURIComponent(`Publish new post (${title}) from Jackdaw Editor`)
      fetch(`https://gitlab.com/api/v3/projects/${gitlab.projects[gitlab.chosenProject].id}/repository/files?file_path=${filename}&branch_name=master&encoding=base64&content=${encodedContent}&commit_message=${commitMessage}`, {
        method: 'POST',
        headers
      })
    } else {
      const commitMessage = encodeURIComponent(`Update and publish '${title}' from Jackdaw Editor`)
      fetch(`https://gitlab.com/api/v3/projects/${gitlab.projects[gitlab.chosenProject].id}/repository/files?file_path=${postData.file_path}&branch_name=master&encoding=base64&content=${encodedContent}&commit_message=${commitMessage}`, {
        method: 'PUT',
        headers
      })
    }
  }
  props: {
    postData: Object,
    isNewPost: boolean,
    token: string,
    gitlab: Object
  }
  input: HTMLInputElement
  editor: SimpleMDE
  render() {
    const { title, categories } = this.state
    return (
      <div>
        <div className={styles.container}>
          <div className={styles.extraContainer}>
            <div className={styles.date}>Date: {this.state.date.toDateString()} </div>
            <button className={styles.draft}>Save as draft</button>
            <button className={styles.publish} onClick={this.handlePublishClick}>Publish</button>
          </div>
          <input type="text" className={styles.title} classID="pen" placeholder="Your Title" value={title} onChange={this.handleTitleChange} />
          <input type="text" className={styles.categories} classID="pen" placeholder="Categories" value={categories} onChange={this.handleCategoriesChange} />
          <textarea id="editor" className={styles.editor} />
          <div
            className={
              this.props.isNewPost ? styles.newPostIndicator : styles.newPostIndicatorInvisible
            }
          />
        </div>
      </div>
    )
  }
}
