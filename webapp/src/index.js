import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
// import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import reducer from './reducers'
import App from './components/App'
import Home from './components/Home'

import './styles/style.css'

console.log('----------index.js');

// const reducer = combineReducers({
//   ...reducers,
//   routing: routerReducer
// })
const store = createStore(reducer);
// const history = syncHistoryWithStore(browserHistory, store)

console.log('----------index.js---after store');

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Home} />
      <Route path="/:page" component={App} />
    </Router>
  </Provider>,
  document.getElementById('root')
)
