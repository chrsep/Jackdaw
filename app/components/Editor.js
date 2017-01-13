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
  }
  state: {
    title: string,
    categories: string,
    content: string
  }
  componentDidMount() {
    this.editor = new SimpleMDE({
      element: document.getElementById('editor')
    })
    this.editor.codemirror.on('change', () => this.handleContentChange(this.editor.value()))
  }
  componentWillReceiveProps(nextProps: Object) {
    const postHelper = new PostHelper()
    this.setState({
      title: postHelper.extractName(nextProps.postData.file_name),
      categories: nextProps.postData.content
    })
  }
  componentWillUpdate(nextProps: Object) {
    if (this.editor !== undefined && this.props.postData.content !== nextProps.postData.content) {
      this.editor.value(atob(nextProps.postData.content))
    }
  }
  handleTitleChange = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ title: event.target.value })
    }
  }
  handleCategoriesChange = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ categories: event.target.value })
    }
  }
  handleContentChange = (value: string) => {
    this.setState({ content: value })
  }
  props: {
    postData: Object
  }
  input: HTMLInputElement
  editor: SimpleMDE
  render() {
    const { title, categories } = this.state
    return (
      <div>
        <div className={styles.container}>
          <input type="text" className={styles.title} classID="pen" placeholder="Your Title" ref={node => { this.input = node }} value={title} onChange={this.handleTitleChange} />
          <input type="text" className={styles.categories} classID="pen" placeholder="Categories" ref={node => { this.input = node }} value={categories} onChange={this.handleCategoriesChange} />
          <textarea id="editor" className={styles.editor} />
        </div>
      </div>
    )
  }
}
