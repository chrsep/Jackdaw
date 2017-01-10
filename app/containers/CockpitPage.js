// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home';
import * as TokenAction from '../actions/token';
import * as GitlabAction from '../actions/gitlab';

function mapStateToProps(state) {
  return {
    token: state.token,
    gitlab: state.gitlab
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...TokenAction, ...GitlabAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
