import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar title="Procore" iconClassNameRight="muidocs-icon-navigation-expand-more" />
          {this.props.children}
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
