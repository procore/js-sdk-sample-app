import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { Drawer, MenuItem } from 'material-ui'
import AppBar from 'material-ui/AppBar'

class App extends React.Component {
  constructor(){
   super()
   this.state = { open: false }
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div>
          {this.props.children}
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
