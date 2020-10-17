import { createStore, applyMiddleware, compose } from "redux"
import rootReducer from "./reducers"
// import thunk from 'redux-thunk'
import LogRocket from 'logrocket'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore(
  rootReducer,
  // composeEnhancers(applyMiddleware(thunk))
  composeEnhancers(applyMiddleware(LogRocket.reduxMiddleware()))
)