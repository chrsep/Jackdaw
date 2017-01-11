// @flow
import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import HomePage from './containers/HomePage'
import CounterPage from './containers/CounterPage'
import CockpitPage from './containers/CockpitPage'
import ProjectSelectionPage from './containers/ProjectSelectionPage'


export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/cockpit" component={CockpitPage} />
    <Route path="/select" component={ProjectSelectionPage} />
  </Route>
)
