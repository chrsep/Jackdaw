// @flow
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Cockpit from '../components/Cockpit'
import * as TokenAction from '../actions/token'
import * as GitlabAction from '../actions/gitlab'

function mapStateToProps(state) {
  return {
    token: state.token,
    gitlab: state.gitlab,
    posts: state.posts
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...TokenAction, ...GitlabAction }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Cockpit)
