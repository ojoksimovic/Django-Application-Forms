import React, { useState, useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import FormsTable from './myFormsTable';
import {Typography} from '@material-ui/core';
import NavBar from '../app/NavBar'

const MyForms = () => {
  return (
    <div>
<NavBar/>
    <div className = "container-fluid">
      <Typography variant = "h5"> My Forms</Typography>
      <FormsTable/>
    </div>
    </div>
  );
}

export default MyForms