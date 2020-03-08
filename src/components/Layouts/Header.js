import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import logo from  '../../logo.png';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header({types, handleMenuClick, handleReportClick, reportTypes, handleLeaderBoard}) {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [auth2, setAuth2] = React.useState(true);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const open2 = Boolean(anchorEl2);

  const handleChange = event => {
    setAuth(event.target.checked);
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleChange2 = event => {
    setAuth2(event.target.checked);
  };

  const handleMenu2 = event => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: '#009688' }}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <img src={logo} alt="SwagSocial" style={{width:'70px', padding:'10px', marginRight:'2px'}}/>
          <Typography variant="h6" className={classes.title}>
             SwagSocial
          </Typography>
          {auth && (
            <div>
              <MenuItem onClick={handleMenu}>
              <Typography style={{fontSize:'18px'}} className={classes.title}>
              View Complaints
          </Typography>
                
                </MenuItem>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                {types.map(type => (
                  <MenuItem onClick = {() => {
                    console.log("Selected ", type);
                    handleMenuClick(type)
                }} 
                key={type}>
                                <Typography style={{fontSize:'18px'}} className={classes.title}>
                                {type.charAt(0).toUpperCase() + type.slice(1)}
          </Typography></MenuItem>
                ))
                }
              </Menu>
            </div>
          )}
          {auth2 && (
            <div>
              <MenuItem onClick={handleMenu2}>
              <Typography style={{fontSize:'18px'}} className={classes.title}>
              View Stats
          </Typography></MenuItem>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl2}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open2}
                onClose={handleClose2}
              >
                {reportTypes.map(type => (
                  <MenuItem onClick = {() => {
                    console.log("Selected ", type);
                    handleReportClick(type)
                }} 
                key={type}>
                  <Typography style={{fontSize:'18px'}} className={classes.title}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
          </Typography>
                  </MenuItem>
                ))
                }
              </Menu>
            </div>
          )}
          <MenuItem onClick={() => {handleLeaderBoard()}}><Typography style={{fontSize:'18px'}} className={classes.title}>
              View Leaderboard
          </Typography></MenuItem>
        </Toolbar>
      </AppBar>
    </div>
  );
}
