import React, { useState, useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import FormsTable from './myFormsTable';
import {Typography} from '@material-ui/core';
import NavBar from '../app/NavBar';
import { Context, withContext } from "../app/context";


const MyForms = () => {
  const {
    rows, userInfo
  } = useContext(Context);

  return (
    <div>
<NavBar/>
    <div className = "container-fluid">
      <Typography variant = "h5"> My Forms</Typography>
     { userInfo? <FormsTable/> :null}
    </div>
    </div>
  );
}

export default MyForms