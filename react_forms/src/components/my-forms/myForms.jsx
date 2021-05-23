import React, { useState, useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import FormsTable from './myFormsTable';
import {Typography} from '@material-ui/core';

const MyForms = () => {
  return (
    <div>
      <Typography variant = "h5"> My Forms</Typography>
      <FormsTable/>
    </div>
  );
}

export default MyForms