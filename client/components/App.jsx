import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { Drawer, MenuItem } from 'material-ui'
import AppBar from 'material-ui/AppBar'

class App extends React.Component {
  constructor(){
   super()
   this.state = { open: false, groups: [] }
  }

  componentDidMount() {
    fetch('/api/resources', { headers: { 'Content-Type': 'application/json' } })
      .then(res => res.json())
      .then(({ groups }) => {
        this.setState({ groups })
      })
  }

  render() {
    const onRoute = (path) => {
      this.setState({ open: false }, () => { this.props.router.push(path) })
    }

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div>
          <Drawer open={this.state.open} onRequestChange={(open) => this.setState({open})}>
            {this.state.groups.map(({ label, path }) => (
              <MenuItem key={path} onTouchTap={() => onRoute(path)}>{label}</MenuItem>
            ))}
          </Drawer>
          <AppBar
            title="Procore Resources"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            onLeftIconButtonTouchTap={() => this.setState({ open: true })}
          />
          {this.props.children}
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
