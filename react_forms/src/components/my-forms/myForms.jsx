import React, { useState, useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import FormsTable from './myFormsTable';
import {Typography, Paper} from '@material-ui/core';
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
    <Paper elevation={3} style = {{padding: 25}}>
      <Typography variant = "h5"> My Forms</Typography>
     { userInfo? <FormsTable/> :null}
     </Paper>
    </div>
    </div>
  );
}

export default MyForms