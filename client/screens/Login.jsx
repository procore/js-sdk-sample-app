import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton';

class Login extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <div><RaisedButton label="Login" href="/sessions/create" /></div>
      </MuiThemeProvider>
    )
  }
}

export default Login
