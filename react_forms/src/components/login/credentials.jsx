import React, { useState, useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import {Card, TextField, CardContent, Button, Typography} from '@material-ui/core';




export default function Credentials() {



  return (
       <Card style = {{alignSelf: "center", width: "500px", textAlign: "center", padding: 0, margin: "auto",}}>
        <CardContent align = "left" style = {{padding: 15, backgroundColor: "#002a5c", color: "white"}}>
          <Typography  variant="h6" component="h1">
          Forms
          </Typography>
          <Typography  variant="subtitle2" component="h2">
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
  <Button type = "submit" className = "login-button" variant = "contained" align = "center" style = {{textTransform: "none", width: "100%", backgroundColor: "#002a5c", color: "white", marginTop: 20, padding: 15}}>
      <Typography variant = "body1" component = "h5">
      Login
      </Typography>
      </Button>
</form>

</CardContent> 

    </Card>
  );
}
