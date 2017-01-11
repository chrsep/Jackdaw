// @flow
import React, { Component } from 'react'
import SimpleMDE from 'simplemde'
import styles from './Editor.css'

export default class Editor extends Component {
  componentDidMount() {
    let editor = new SimpleMDE({
      element: document.getElementById('editor')
    })
  }
  props:{
    title: string,
    description: string,

  }
  input: HTMLInputElement
  render() {
    return (
      <div>
        <div className={styles.container}>
          <input type="text" className={styles.title} classID="pen" placeholder="Your Title" ref={node => { this.input = node }} />
          <textarea id="editor" className={styles.editor} />
        </div>
      </div>
    )
  }
}
