import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, hashHistory, Redirect } from 'react-router'
import configureStore from './configureStore'
import Home from './components/Home'
import Page from './containers/Page'

import './styles/style.css'

const store = configureStore()

render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/">
        <IndexRoute component={Home}/>
        <Route path="/tweets" component={Page}/>
        <Route path="/friends" component={Page}/>
        <Redirect from="*" to="/"/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)

