import logo from './logo.svg';
import ReactDOM from 'react-dom';
import './App.css';
import React, { useContext, useEffect, useState } from 'react';
import ROUTE from './components/app/route'
import NavBar from './components/app/NavBar';
import Login from './components/login/login';
import MyForms from './components/my-forms/myForms';
import NewForms from './components/new-forms/newForms';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {Context, withContext} from './components/app/context'


function App() {
  const {authentication, setAuthentication} = useContext(Context)
  
  return (
    <div style = {{height: "100vh"}}>
<Router>
      <Switch>
      <Route path={ROUTE.LOGIN} component={Login}></Route>
      {!authentication? <Redirect to={ROUTE.LOGIN} />:
       null}
        <Route path={ROUTE.MY_FORMS} component={NavBar}></Route>
        <Route path={ROUTE.NEW_FORM} component={NavBar}></Route>  

      </Switch>
      </Router>
      
    </div>
  );
}

export default withContext(App);
