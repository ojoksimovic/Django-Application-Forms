import React, {useState, useContext, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Button, Drawer, Divider, Collapse, Typography, List, ListItem, ListItemText} from '@material-ui/core';
import {ExpandLess, ExpandMore, VerifiedUser} from '@material-ui/icons';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import './hamburgers.css'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import ROUTE from './route';
import MyForms from '../my-forms/myForms';
import NewForms from '../new-forms/newForms';
import '../login/style.css';
import {Context, withContext} from '../app/context'
import { useHistory } from "react-router-dom";




const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#00204E", 
    color: "white", 
    fontFamily: 'Roboto', 
    fontWeight: "300", 
    fontSize: "1.4rem",
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    marginTop: 65,
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1, 3),
    paddingTop: 20,
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start'
  }
}));


const NavBar = () => {
    const [open, setOpen] = useState(true);
    const {authentication, setAuthentication, state, setState} = useContext(Context)
    const history = useHistory();
  
    const handleLogoutClick = () => {
      setAuthentication(false)
      history.push(ROUTE.LOGOUT);
    }
    const handleClick = () => {
      setOpen(!open);
    };

    const handleHamburgerClick = () => {
      setState(!state);
    }


      const classes = useStyles();
      const theme = useTheme();

    
      return (
        <div >
<AppBar
            position="fixed"
            className={classes.appBar}
          >
            <Toolbar>
                <button onClick={handleHamburgerClick} class=
        {state ?
          "navbar-toggler hamburger hamburger--arrowalt is-active" :
          "navbar-toggler hamburger hamburger--arrowalt"}
        type="button"
        data-toggle="collapse"
        data-target="#navbarToggler"
        aria-controls="navbarToggler"
        aria-expanded="false"
        aria-label="Toggle navigation"
        style = {{
          color: 'transparent',
          marginRight: 10,
        }}>
        <span class="hamburger-box">
          <span class="hamburger-inner"></span>
        </span>
        </button>
              <Typography variant="h6" noWrap>
                Forms
              </Typography>
            </Toolbar>
          </AppBar>

        
        <div className={classes.root}>
          <CssBaseline />
          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={state}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader}>
              <Typography variant='h5' style = {{fontWeight: "800"}}>Olivera Joksimovic</Typography>
            </div>
            <div className = {classes.drawerHeader}>
            <Button className = "button" onClick = {handleLogoutClick} variant = "contained">Logout</Button>
            <Button  variant = "contained">FIPPA <VerifiedUser style = {{marginLeft: 5}}/></Button>
            </div>
            <Divider />
            <List>
                <ListItem button onClick={handleClick}>
                  <ListItemText primary="Forms"/>

                  {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding style = {{paddingLeft: 20}}>
          <ListItem button component = {Link} to = {ROUTE.MY_FORMS}>
            <ListItemText primary="My Forms" />
                </ListItem>
                <ListItem button component = {Link} to = {ROUTE.NEW_FORM}>
                <ListItemText primary="New Form" />
                </ListItem>
                </List>
                </Collapse>
            </List>
          </Drawer>

        </div>
        </div> 
      );
    }

export default NavBar;