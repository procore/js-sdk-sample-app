import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import App from './modules/App.jsx'
import Home from './modules/Home.jsx'

injectTapEventPlugin()

ReactDOM.render(
  (
    <Router history={browserHistory}>
      <Route path="/" component={App} >
        <IndexRoute component={Home} />
      </Route>
    </Router>
  ),
  document.getElementById('app')
)
