// @flow
import React, { Component } from 'react'
import styles from './Cockpit.css'
import Editor from './Editor'


export default class Cockpit extends Component {
  props: {
    gitlab: Object,
    posts: string[]
  }
  render() {
    const { gitlab, posts } = this.props
    const extractName = item => item.substr(11).split('-').join(' ').replace('.markdown', '')
    const postItem = (item, index) => (
      <div key={index} className={styles.project}>
        / {extractName(item)}
      </div>
    )
    return (
      <div>
        <div className={styles.container}>
          <div className={styles.navbar} >
            {gitlab.projects[gitlab.chosenProject].name}
          </div>
          <div className={styles.fileindex} >
            {posts.map((
              (item: string, index) =>
                postItem(item, index)
              ))}
          </div>
          <div className={styles.new} />
          <Editor description="" title="" />
        </div>
      </div>
    )
  }
}
