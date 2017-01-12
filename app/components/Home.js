// @flow
import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import styles from './Home.css'


export default class Home extends Component {
  constructor(props: Object) {
    super(props)
    this.state = { loading: '' }
  }
  state: {
    loading: string
  }
  input: HTMLInputElement;
  props: {
    changeToken: () => void,
    refreshProject: () => void
  }
  authorize = () => {
    // Save token
    const { changeToken, refreshProject } = this.props
    changeToken(this.input.value)
    this.setState({ loading: 'Loading' })
    // Fetch List of projects from gitlab
    const headers = new Headers({ 'PRIVATE-TOKEN': this.input.value })
    fetch('https://gitlab.com/api/v3/projects/owned', {
      method: 'GET',
      headers
    }).then(
      result => result.json()
    ).then(
      json => {
        this.setState({ loading: 'Success' })
        refreshProject(json.map(item => ({ name: item.name, id: item.id })))
        hashHistory.push('/select')
        return true
      }
    ).catch(() => {
      this.setState({ loading: 'Failed' })
    })
  }
  render() {
    return (
      <div>
        <div className={styles.container}>
          <img src="../resources/images/gitlab-logo.png" alt="" className={styles.logo} />
          <input type="text" className={styles.token} placeholder="Gilab Token" ref={node => { this.input = node }} />
          <div className={styles.indicator}>{this.state.loading}</div>
          <button className={styles.button} onClick={this.authorize}>Authorize</button>
        </div>
      </div>
    )
  }
}
