// @flow
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { hashHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import rootReducer from '../reducers'

const router = routerMiddleware(hashHistory)

const enhancer = compose(applyMiddleware(thunk, router), autoRehydrate())

export default function configureStore(initialState: Object | void) {
  const store = createStore(rootReducer, initialState, enhancer)
  persistStore(store)
  return store
}
