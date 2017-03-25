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
      loading: '',
      isNewPost: true,
      selectedIndex: -1
    }
  }
  state: {
    postData: Object,
    loading: string,
    isNewPost: boolean,
    selectedIndex: number
  }
  onBackClickHandler = () => {
    hashHistory.push('/select')
  }
  onPostClickHandler = (index: number) => {
    const { gitlab, posts, token } = this.props
    this.setState({ loading: 'Loading', selectedIndex: index })
    const headers = new Headers({
      'PRIVATE-TOKEN': token
    })
    fetch(`https://gitlab.com/api/v3/projects/${gitlab.projects[index].id}/repository/files?file_path=_posts/${posts[index]}&ref=master`, {
      method: 'GET',
      headers
    }).then(
      result => result.json()
    ).then(json => {
      this.setState({ loading: 'Success', postData: json, isNewPost: false })
      return true
    }).catch(() => {
      this.setState({ loading: 'Failed', selectedIndex: -1, postData: {}, isNewPost: true })
    })
  }
  onNewClickHandler = () => {
    this.setState({ postData: {}, isNewPost: true, selectedIndex: -1 })
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
      <button
        key={index}
        className={index === this.state.selectedIndex ? styles.postSelected : styles.post}
        onClick={() => this.onPostClickHandler(index)}
      >
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
            <button className={styles.new} onClick={this.onNewClickHandler}>New Post</button>
            <div className={styles.loading}>{this.state.loading}</div>
          </div>
          <Editor
              postData={this.state.postData}
              isNewPost={this.state.isNewPost}
              token={this.props.token}
              gitlab={this.props.gitlab} />
        </div>
      </div>
    )
  }
}
