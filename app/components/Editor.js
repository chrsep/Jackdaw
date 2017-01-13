// @flow
import React, { Component } from 'react'
import SimpleMDE from 'simplemde'
import styles from './Editor.css'
import PostHelper from '../utils/PostHelper'

export default class Editor extends Component {
  constructor(props: Object) {
    super(props)
    this.state = {
      title: '',
      categories: '',
      content: ''
    }
    this.editor = undefined
    this.postHelper = new PostHelper()
  }
  state: {
    title: string,
    categories: string,
    content: string
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
        categories: ''
      })
      this.editor.value('')
    } else if (nextProps.postData.file_name !== undefined) {
      this.setState({
        title: this.postHelper.extractName(nextProps.postData.file_name),
        categories: this.postHelper.extractCategories(nextProps.postData.content)
      })
      this.editor.value(this.postHelper.extractContents(nextProps.postData.content))
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
  props: {
    postData: Object,
    isNewPost: boolean
  }
  input: HTMLInputElement
  editor: SimpleMDE
  postHelper: PostHelper
  render() {
    const { title, categories } = this.state
    return (
      <div>
        <div className={styles.container}>
          <input type="text" className={styles.title} classID="pen" placeholder="Your Title" value={title} onChange={this.handleTitleChange} />
          <input type="text" className={styles.categories} classID="pen" placeholder="Categories" value={categories} onChange={this.handleCategoriesChange} />
          <textarea id="editor" className={styles.editor} />
        </div>
      </div>
    )
  }
}
