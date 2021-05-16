import React, {useState, useContext, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Drawer, Divider, Typography, List, ListItem, ListItemText} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import './hamburgers.css'
import FormsTable from '../my-forms/myFormsTable.jsx'


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
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
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

    const handleHamburgerClick = () => {
      setState(!state);
    }


      const classes = useStyles();
      const theme = useTheme();

    
      return (
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: state,
            })}
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

            </div>
            <Divider />
            <List>
              {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              {['All mail', 'Trash', 'Spam'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </Drawer>
          <main
            className={clsx(classes.content, {
              [classes.contentShift]: state,
            })}
          >
            <div className={classes.drawerHeader} />
<FormsTable />
          </main>
        </div>
      );
    }






// return (
//     <div id = "navbar" style = {{backgroundColor: "#00204E", color: "white", fontFamily: 'Roboto', fontWeight: "300", fontSize: "1.4rem"}}>
//   <button onClick={handleHamburgerClick} class=
//         {state ?
//           "navbar-toggler hamburger hamburger--squeeze is-active" :
//           "navbar-toggler hamburger hamburger--squeeze"}
//         type="button"
//         data-toggle="collapse"
//         data-target="#navbarToggler"
//         aria-controls="navbarToggler"
//         aria-expanded="false"
//         aria-label="Toggle navigation"
//         style = {{
//           color: 'transparent',
//           marginRight: 10,
//         }}>
//         <span class="hamburger-box">
//           <span class="hamburger-inner"></span>
//         </span>
//       </button>
//   <a class="navbar-brand" href="#" style = {{color: "white", fontFamily: 'Roboto', fontWeight: "300", fontSize: "1.4rem"}}>Forms</a>

//   <Drawer
//         variant="persistent"
//         anchor="left"
//         open={state}
//       >
//         <div>
//           <IconButton onClick={handleHamburgerClick}>
//             <ChevronLeftIcon />
//           </IconButton>
//         </div>
//         <Divider />
//         <List>
//           {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
//             <ListItem button key={text}>
//               <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
//               <ListItemText primary={text} />
//             </ListItem>
//           ))}
//         </List>
//         <Divider />
//         <List>
//           {['All mail', 'Trash', 'Spam'].map((text, index) => (
//             <ListItem button key={text}>
//               <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
//               <ListItemText primary={text} />
//             </ListItem>
//           ))}
//         </List>
//       </Drawer>
// </div>


// )}

export default NavBar;