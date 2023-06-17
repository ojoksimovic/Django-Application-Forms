import {
    Checkbox,
    FormControl,
    FormControlLabel,
    Link,
    Radio,
    RadioGroup,
    Typography, Paper,
} from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.css";
import React, { useContext } from "react";
import axiosInstance from '../app/api';
import { Context } from "../app/context";
import NavBar from "../app/NavBar";


export default function AwardLetter({formInfo}) {  

    const {userInfo, convertDate, handleFileDownload} = useContext(Context);

    const getPaymentActivationForm = () => {
      axiosInstance
      .get(
        '/api/payment-activation/'
      )
      .then(response => {
    })
      .catch(error => {
      console.log(error.response)})
    }
  

    return(
        <div>
        <NavBar/>
            <div className="container-fluid">
                <div className="row">
                  <div className="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2">
            <Paper elevation={3} style = {{padding: 25, marginBottom: 40}}>
        
<div>
                    <Typography className="form-field-title" gutterBottom variant = 'h5'>Award Letter</Typography>
              <Typography gutterBottom variant = 'body2'>Details listed below.</Typography>
              <hr />
           <Typography
              gutterBottom
              variant="body1"
            >
              Award Letter text goes here.
            </Typography>
        </div>
        </Paper>
            </div>
            </div>
            </div>
            </div>
    )
}