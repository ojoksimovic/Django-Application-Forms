import logo from './logo.svg';
import ReactDOM from 'react-dom';
import './App.css';
import React, { useContext, useEffect, useState } from 'react';
import ROUTE from './components/app/route'
import NavBar from './components/app/NavBar';
import Login from './components/login/login';
import MyForms from './components/my-forms/myForms';
import NewForms from './components/new-forms/newForms';


function App() {
  return (
    <div style = {{height: "100vh"}}>
      <NavBar />
    </div>
  );
}

export default App;
