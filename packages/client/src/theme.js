import { createMuiTheme } from '@material-ui/core/styles';
import deepOrange from '@material-ui/core/colors/deepOrange';
import blue from '@material-ui/core/colors/blue';
import common from '@material-ui/core/colors/common';

const fontFamily = [
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"'
].join(',');

export const theme = createMuiTheme({
  typography: {
    fontFamily
  },
  palette: {
    primary: deepOrange,
    secondary: blue,
    background: {
      default: common['white']
    }
  }
});
