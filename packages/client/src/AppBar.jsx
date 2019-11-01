import React from 'react';
import { styled } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const Title = styled(Typography)({
  flexGrow: 1,
});

function Account() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }

  function logout() {
    window.location.replace('/session/logout');
  }

  return (
    <React.Fragment>
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-controls="appbar-account-menu"
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="appbar-account-menu"
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={logout}>Log out</MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export function AppBar() {
  return (
    <MuiAppBar color="primary" position="static">
      <Toolbar>
        <Title variant="h6">My App</Title>
        <Account />
      </Toolbar>
    </MuiAppBar>
  );
}
