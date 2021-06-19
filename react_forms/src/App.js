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
import Register from './components/register/register';
import PaymentActivation from './components/new-forms/PaymentActivation';
import OGS from './components/new-forms/OGS';
import TravelGrant from './components/new-forms/TravelGrant';
import GymBursary from './components/new-forms/GymBursary';
import formView from './components/my-forms/formView';


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

      <Switch>
      <Route path = {ROUTE.LOGOUT} component = {Logout}></Route>

      <Route path={ROUTE.LOGIN} component = {Login}>
      {localStorage.getItem("refresh_token")? <Redirect to={ROUTE.MY_FORMS} />:
       null} 
      </Route>

      <Route path = {ROUTE.REGISTER} component = {Register}>
      {localStorage.getItem("refresh_token")? <Redirect to={ROUTE.MY_FORMS} />:
       null}
      </Route>

      {!localStorage.getItem("refresh_token")? <Redirect to={ROUTE.LOGIN} />:
       null} 
       

       <main style = {{height: "100%"}}
            className={clsx(classes.content, {
              [classes.contentShift]: state,
            })}
          >
        <Route exact path={ROUTE.MY_FORMS} component={MyForms}/>
        <Route path={ROUTE.FORM_VIEW} component={formView}/>
        <Route exact path={ROUTE.NEW_FORM} component={NewForms}/>
        <Route path={ROUTE.PAYMENT_ACTIVATION} component={PaymentActivation}/> 
        <Route path={ROUTE.OGS} component={OGS}/> 
        <Route path={ROUTE.TRAVEL_GRANT} component={TravelGrant}/> 
        <Route path={ROUTE.GYM_BURSARY} component={GymBursary}/> 
        

            {localStorage.getItem("refresh_token")? <Redirect to={ROUTE.MY_FORMS} />:
       null}   
      
        </main>
      </Switch>
      </Router>
      
    </div>
  );
}

export default withContext(App);
