// @flow
import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import styles from './Cockpit.css'
import Editor from './Editor'
import PostHelper from '../utils/PostHelper'

export default class Cockpit extends Component {
  constructor(props: Object) {
    super(props)
    this.state = {
      postData: {},
      loading: ''
    }
  }
  state: {
    postData: Object,
    loading: string
  }
  onBackClickHandler = () => {
    hashHistory.push('/select')
  }
  onPostClickHandler = (index: number) => {
    const { gitlab, posts, token } = this.props
    const headers = new Headers({
      'PRIVATE-TOKEN': token
    })
    fetch(`https://gitlab.com/api/v3/projects/${gitlab.projects[index].id}/repository/files?file_path=_posts/${posts[index]}&ref=master`, {
      method: 'GET',
      headers
    }).then(
      result => result.json()
    ).then(json => {
      this.setState({ loading: 'Success', postData: json })
      return true
    }).catch(() => {
      this.setState({ loading: 'Failed' })
    })
  }
  props: {
    gitlab: Object,
    posts: string[],
    token: string
  }
  render() {
    const { gitlab, posts } = this.props
    const postHelper = new PostHelper()
    const postItem = (item, index) => (
      <button key={index} className={styles.post} onClick={() => this.onPostClickHandler(index)}>
        {postHelper.extractName(item)}
      </button>
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
          <Editor postData={this.state.postData} />
        </div>
      </div>
    )
  }
}
