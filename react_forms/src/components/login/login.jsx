import React, { useState, useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './style.css';
import { createMuiTheme } from '@material-ui/core/styles';
import Credentials from './credentials'

const theme = createMuiTheme({
  palette: {
    primary: {
      main:'#002a5c',
    },
    secondary: {
      main: '#FFFFFF',
    }
  },
});


export default function Login() {

const [proceedLogin, setProceedLogin] = useState(false);
const [credentials, setCredentials] = useState(false);

const handleProceedLoginClick = () => {
  setProceedLogin(true);
}

const handleCredentialsClick = () => {
  setCredentials(true);
}

  return (
    <div style = {{height: "100%", width: "100%", margin: 0, display: "flex",  background: "radial-gradient(circle,hsla(0,0%,100%,.3) -52%,#002a5c 66%)"}}>
       {!credentials?
       <Card style = {{alignSelf: "center", width: "500px", textAlign: "center", padding: 0, margin: "auto",}}>
        {!proceedLogin ?
        <CardContent align = "left" style = {{padding: 15, backgroundColor: "#002a5c", color: "white"}}>
          <Typography  variant="h6" component="h1">
          Forms
          </Typography>
          <Typography  variant="subtitle2" component="h2">
          Division of Mock
          </Typography>
        </CardContent>
        : 
        <CardContent align = "center" style = {{padding: 15, backgroundColor: "#002a5c", color: "white"}}>
          <Typography  variant="h6" component="h1">
          Division of Mock
          </Typography>
        </CardContent>
        }
{!proceedLogin ?
        <CardContent style = {{padding: "50px"}}>
          <Typography variant = "subtitle2" component = "p">
            In order for you to use this system you need to authenticate.
          </Typography>
        <Button  className = "login-button" onClick = {handleProceedLoginClick} variant = "contained" align = "center" style = {{textTransform: "none", width: "100%", backgroundColor: "#002a5c", color: "white", marginTop: 20, padding: 15}}>
        <Typography variant = "body1" component = "h5">
        Proceed to Login
        </Typography>
        </Button>
</CardContent> :
        <CardContent  style = {{padding: "50px"}}>
        <Typography variant = "h5" component = "h2">
Login
        </Typography>
      <Button className = "login-button" onClick = {handleCredentialsClick} variant = "contained" align = "center" style = {{textTransform: "none", width: "100%", backgroundColor: "#002a5c", color: "white", marginTop: 20, padding: 15}}>
      <Typography variant = "body1" component = "h5">
      Log in with Credentials
      </Typography>
      </Button>
      <Button  className = "login-button" variant = "contained" align = "center" style = {{textTransform: "none", width: "100%", backgroundColor: "#337AB7", color: "white", marginTop: 20, padding: 15}}>
      <Typography variant = "body1" component = "h5">
      Register Account
      </Typography>
      </Button>
</CardContent>
}

    </Card>:
    <Credentials/>}
    </div>
  );
}
