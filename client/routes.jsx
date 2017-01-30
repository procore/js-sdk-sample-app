import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router/es'

import App from './components/App.jsx'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import Resource from './components/Resource.jsx'
import List from './components/List.jsx'
import Get from './components/Get.jsx'

injectTapEventPlugin()

ReactDOM.render(
  (
    <Router history={browserHistory}>
      <Route path="/login" component={Login}/>
      <Route path="/" component={App}>
        <Route path="/:resource" component={Resource}>
          <Route path="/:id" component={Get}/>
          <IndexRoute component={List}/>
        </Route>
        <IndexRoute component={Home}/>
      </Route>
    </Router>
  ),
  document.getElementById('app')
)
