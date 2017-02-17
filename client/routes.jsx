import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router/es'
import { Provider } from 'react-redux'
import { reducer, store } from './duck'

import App from './screens/App.jsx'
import Home from './screens/Home.jsx'
import Login from './screens/Login.jsx'


injectTapEventPlugin()

ReactDOM.render(
  (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/login" component={Login}/>
        <Route path="/" component={App}>
          <IndexRoute component={Home}/>
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('app')
)
