import {
  Paper,
  Typography,
} from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.css";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../app/NavBar";
import axiosInstance from '../app/api';
import { Context } from "../app/context";



export default function AwardLetter() {  

    const [formInfo, setFormInfo] = useState();
    const [formView, setFormView] = useState();
    const {userInfo} = useContext(Context);
    const [loaded, setLoaded] = useState();
    const {confirmationNumber} = useParams();

    useEffect(()=> {
      if (!loaded){
        setLoaded(true)
      getPaymentActivationForm();
      }
    })
    const getPaymentActivationForm = () => {
      axiosInstance
      .get(
        '/api/payment-activation/'
      )
      .then(response => { 
        for (let i = 0; i < response.data.length; i++){
        if (response.data[i].confirmation_number == confirmationNumber){
          setFormInfo(response.data[i])
          console.log(response.data[i])
          setFormView('applicant')
        }
      else if (response.data[i].admin_confirmation_number == confirmationNumber){
        setFormInfo(response.data[i])
        setFormView('administrator')
      }
    }})
      .catch(error => {console.log(error.response)})
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
              style={{whiteSpace: 'pre-line'}}>
                {formInfo?.award_letter}
            </Typography>
        </div>
        </Paper>
            </div>
            </div>
            </div>
            </div>
    )
}