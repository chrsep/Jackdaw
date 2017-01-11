// @flow
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ProjectSelection from '../components/ProjectSelection'
import * as TokenAction from '../actions/token'
import * as GitlabAction from '../actions/gitlab'
import * as PostsAction from '../actions/posts'

function mapStateToProps(state) {
  return {
    token: state.token,
    gitlab: state.gitlab
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...TokenAction, ...GitlabAction, ...PostsAction }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectSelection)
