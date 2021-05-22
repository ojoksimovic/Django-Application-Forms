import React, { useState, useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import {Card, TextField, CardContent, Button, Typography} from '@material-ui/core';
import {Context, withContext} from '../app/context'
import { useHistory } from "react-router-dom";
import ROUTE from '../app/route';

export default function Credentials() {

  const {authentication, setAuthentication} = useContext(Context)
  const history = useHistory();

  const handleSubmit = () => {
    setAuthentication(true)
    history.push(ROUTE.MY_FORMS);
  }
  return (
       <Card style = {{alignSelf: "center", width: "500px", textAlign: "center", padding: 0, margin: "auto",}}>
        <CardContent align = "center" style = {{padding: 15, backgroundColor: "#002a5c", color: "white"}}>
          <Typography  variant="h6" component="h1">
          Division of Mock
          </Typography>

        </CardContent>

        <CardContent style = {{padding: "50px"}}>
          <Typography variant = "h6" component = "p" style = {{marginBottom: 20}}>
Please enter your credentials.         
 </Typography>
 <form noValidate autoComplete="off">
  <TextField id="username" label="Username" variant="outlined" style = {{margin: 10, width: "100%"}} />
  <TextField id="password" label="Password" variant="outlined" type = "password" style = {{margin: 10, width: "100%"}} />
  <Button onClick = {handleSubmit} className = "login-button" variant = "contained" align = "center" style = {{textTransform: "none", width: "100%", backgroundColor: "#002a5c", color: "white", marginTop: 20, padding: 15}}>
      <Typography variant = "body1" component = "h5">
      Login
      </Typography>
      </Button>
      {authentication? <Typography variant = "body1">authenticated!</Typography>:null}

</form>

</CardContent> 

    </Card>
  );
}
