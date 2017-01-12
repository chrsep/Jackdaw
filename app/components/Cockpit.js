// @flow
import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import styles from './Cockpit.css'
import Editor from './Editor'


export default class Cockpit extends Component {
  onBackClickHandler = () => {
    hashHistory.push('/select')
  }
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
    const projectName = () => {
      if (gitlab.projects.length > 0) {
        return gitlab.projects[gitlab.chosenProject].name
      }
      return 'No project selected'
    }
    return (
      <div>
        <div className={styles.container}>
          <div className={styles.navbar} >
            <button onClick={this.onBackClickHandler}>
              <img src="../resources/icons/back.svg" alt="" />
            </button>
            <div className={styles.navbarText}>
              {projectName()}
            </div>
          </div>
          <div className={styles.fileindex} >
            {posts.map((
              (item: string, index) =>
                postItem(item, index)
              ))}
          </div>
          <button className={styles.new} />
          <Editor description="" title="" />
        </div>
      </div>
    )
  }
}
