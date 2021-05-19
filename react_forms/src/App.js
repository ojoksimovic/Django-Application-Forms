import logo from './logo.svg';
import ReactDOM from 'react-dom';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import ROUTE from './components/app/route'
import NavBar from './components/app/NavBar';
import Login from './components/login/login';
import MyForms from './components/my-forms/myForms';
import NewForms from './components/new-forms/newForms';


function App() {
  return (
    <div>
      <NavBar />
    <Router>
      <Switch>
        <Route path={ROUTE.LOGIN} component={Login}></Route>
        <Route path={ROUTE.MY_FORMS} component={MyForms}></Route>
        <Route path={ROUTE.NEW_FORM} component={NewForms}></Route>  
      </Switch>
      </Router>
    </div>
  );
}

export default App;
