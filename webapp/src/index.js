import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import reducer from './reducers'
import App from './components/App'
import Home from './components/Home'
import Page from './components/Page'

import './styles/style.css'

const store = createStore(reducer);

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path=":page" component={Page} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)