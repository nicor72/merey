import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import { Provider } from 'react-redux'
import store from "./redux/store";
import client from './config/client'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import swConfig from './swConfig'
import 'bootstrap/dist/css/bootstrap.min.css'
import LogRocket from 'logrocket'
import setupLogRocketReact from 'logrocket-react'

if (process.env.NODE_ENV === 'production') {
  LogRocket.init('iifo5r/merey')
  setupLogRocketReact(LogRocket)
}

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register(swConfig)
