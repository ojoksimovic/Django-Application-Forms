import { Paper, Typography } from '@material-ui/core';
import "bootstrap/dist/css/bootstrap.css";
import React, { useContext } from "react";
import NavBar from '../app/NavBar';
import { Context } from "../app/context";
import FormsTable from './myFormsTable';


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