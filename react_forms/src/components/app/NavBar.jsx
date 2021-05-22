import React, {useState, useContext, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Button, Drawer, Divider, Collapse, Link, Typography, List, ListItem, ListItemText} from '@material-ui/core';
import {ExpandLess, ExpandMore, VerifiedUser} from '@material-ui/icons';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import './hamburgers.css'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
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
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));


const NavBar = () => {
    const [state, setState] = useState(false);
    const [open, setOpen] = useState(true);

    const {authentication, setAuthentication} = useContext(Context)
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
        <div style = {{height: "100%"}}>
<AppBar
            position="fixed"
            className={classes.appBar}
          >
            <Toolbar>
                <button onClick={handleHamburgerClick} class=
        {state ?
          "navbar-toggler hamburger hamburger--squeeze is-active" :
          "navbar-toggler hamburger hamburger--squeeze"}
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

        
        <div style = {{height: "100%"}}className={classes.root}>
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
              <Typography variant='h5'>Olivera Joksimovic</Typography>
            </div>
            <div className = {classes.drawerHeader}>
            <Button className = "button" onClick = {handleLogoutClick} color = "primary" variant = "contained">Logout</Button>
            <Button className = "button" color = "secondary" variant = "contained">FIPPA <VerifiedUser style = {{marginLeft: 5}}/></Button>
            </div>
            <Divider />
            <List>
                <ListItem button onClick={handleClick}>
                  <ListItemText primary="Forms"/>

                  {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding style = {{paddingLeft: 20}}>
          <ListItem button>
            <ListItemText primary="My Forms" />
                </ListItem>
                <ListItem button>
            <ListItemText primary="New Form" />
                </ListItem>
                </List>
                </Collapse>
            </List>
          </Drawer>
          <main style = {{height: "100%", padding: 0}}
            className={clsx(classes.content, {
              [classes.contentShift]: state,
            })}
          >
            {/* <div className={classes.drawerHeader} /> */}
            <Router>
      <Switch>
        <Route path={ROUTE.MY_FORMS} component={MyForms}></Route>
        <Route path={ROUTE.NEW_FORM} component={NewForms}></Route>  
      </Switch>
      </Router>
          </main>
        </div>
        </div> 
      );
    }

export default NavBar;