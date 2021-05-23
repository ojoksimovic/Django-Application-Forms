import logo from './logo.svg';
import ReactDOM from 'react-dom';
import './App.css';
import React, { useContext, useEffect, useState } from 'react';
import ROUTE from './components/app/route'
import NavBar from './components/app/NavBar';
import Login from './components/login/login';
import Logout from './components/login/logout';
import MyForms from './components/my-forms/myForms';
import NewForms from './components/new-forms/newForms';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import clsx from 'clsx';
import {Context, withContext} from './components/app/context'
import { makeStyles, useTheme } from '@material-ui/core/styles';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    paddingTop: 100
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  },
}));

function App() {
  const {authentication, setAuthentication, state, setState} = useContext(Context)
  

  const classes = useStyles();
  return (
    <div style = {{height: "100vh"}}>
        <Router>
{authentication?<NavBar/> : null}

      <Switch>
      <Route path={ROUTE.LOGIN} component={Login}></Route>
      <Route path = {ROUTE.LOGOUT} component = {Logout}></Route>

      {!authentication? <Redirect to={ROUTE.LOGIN} />:
       null}
       <main style = {{height: "100%"}}
            className={clsx(classes.content, {
              [classes.contentShift]: state,
            })}
          >
        <Route path={ROUTE.MY_FORMS} component={MyForms}></Route>
        <Route path={ROUTE.NEW_FORM} component={NewForms}></Route>  
      
        </main>
      </Switch>
      </Router>
      
    </div>
  );
}

export default withContext(App);
