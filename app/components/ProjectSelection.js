// @flow
import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import styles from './ProjectSelection.css'


export default class ProjectSelection extends Component {
  constructor(props: Object) {
    super(props)
    this.state = { loading: '' }
  }
  state: {
    loading: string
  }
  props: {
    gitlab: {
      projects: {name: string, id: number}[]
    },
    chooseProject: (number) => void,
    addPost: (string) => void,
    token: string
  }
  chooseProject = (index: number) => {
    const { chooseProject, gitlab, token, addPost } = this.props
    this.setState({ loading: 'Loading' })
    chooseProject(index)
    // Fetch List of projects from gitlab
    const headers = new Headers({ 'PRIVATE-TOKEN': token })
    fetch(`https://gitlab.com/api/v3/projects/${gitlab.projects[index].id}/repository/tree?path=_posts`, {
      method: 'GET',
      headers
    }).then(
      result => result.json()
    ).then(json => {
      this.setState({ loading: 'Success' })
      addPost(json.map(item => item.name))
      hashHistory.push('/cockpit')
      return true
    }).catch(() => {
      this.setState({ loading: 'Failed' })
    })
  }
  render() {
    const { projects } = this.props.gitlab
    const projectItem = (project, id) => (
      <button key={id} className={styles.project} onClick={() => this.chooseProject(id)}>
        {project}
      </button>
      )
    return (
      <div>
        <div className={styles.container}>
          <div className={styles.header}>Choose Project</div>
          <div className={styles.projects}>
            {projects.map((project, index) => projectItem(project.name, index))}
          </div>
          <div className={styles.indicator}>{this.state.loading}</div>
        </div>
      </div>
    )
  }
}
