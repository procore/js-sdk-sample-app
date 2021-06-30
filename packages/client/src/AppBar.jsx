import React from 'react';
import { styled, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import axios from 'axios';

const Title = styled(Typography)({
  flexGrow: 1
});

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 600,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

function Account() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [response, setInfoResponse] = React.useState(null);
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Access Token Info</h2>
      <pre>{response}</pre>
    </div>
  );

  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }

  function refreshToken() {
    window.location.replace('/oauth/procore/refresh');
  }

  function revokeToken() {
    window.location.replace('/oauth/procore/revoke');
  }

  const handleClose = () => {
    setOpen(false);
  };
  async function info() {
    try {
      const response = await axios.get(`/oauth/procore/info`);
      setInfoResponse(JSON.stringify(response.data, null, 2));
      setOpen(true);
    } catch (err) {
      alert(err);
    }
  }

  function signOut() {
    window.location.replace('/oauth/procore/signout');
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
        <MenuItem onClick={refreshToken}>Refresh Token</MenuItem>
        <MenuItem onClick={revokeToken}>Revoke Token</MenuItem>
        <MenuItem onClick={info}>Token Info</MenuItem>
        <MenuItem onClick={signOut}>Sign Out</MenuItem>
      </Menu>
      <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title">
        {body}
      </Modal>
    </React.Fragment>
  );
}

export function AppBar() {
  return (
    <MuiAppBar color="primary" position="static">
      <Toolbar>
        <Title variant="h6">Procore Sample Application</Title>
        <Account />
      </Toolbar>
    </MuiAppBar>
  );
}
