import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';

import { theme } from './theme';
import HomeScreen from './Home/Home';

const useGlobalStyles = makeStyles(
  (theme) => ({
    '@global': {
      '*:-webkit-full-screen': {
        height: '100%',
        width: '100%'
      },
      '::-webkit-scrollbar': {
        width: '6px'
      },
      '::-webkit-scrollbar-button': {
        height: 0,
        width: 0
      },
      '::-webkit-scrollbar-thumb': {
        background: 'hsla(0, 0%, 0%, 0.2)',
        borderRadius: '3em',
        transition: 'all .3s ease-in-out'
      },
      '::-webkit-scrollbar-track': {
        background: 'hsla(0, 0%, 0%, 0)'
      },
      body: {
        '&::backdrop': {
          backgroundColor: theme.palette.background.default
        }
      },
      'html, body': {
        height: '100%'
      }
    }
  }),
  { name: 'AdminRootGlobals' }
);

function Root() {
  useGlobalStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Router>
        <Switch>
          <Route path="/" component={HomeScreen} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <Root />
    </ThemeProvider>
  );
}
