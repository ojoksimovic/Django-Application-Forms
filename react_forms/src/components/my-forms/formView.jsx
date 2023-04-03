import React, { useState, useContext, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import {
  Paper
} from "@material-ui/core";
import NavBar from "../app/NavBar";
import { Context, withContext } from "../app/context";
import { useHistory, useParams } from "react-router-dom";
import axiosInstance from '../app/api';
import FormViewSubmitted from "./formViewSubmitted";
import FormViewDraft from "./formViewDraft";
import FormViewDraftAdmin from "./formViewDraftAdmin";
import FormViewSubmittedAdmin from "./formViewSubmittedAdmin";

export default function FormView() {  

const {confirmationNumber} = useParams();
const [formInfo, setFormInfo] = useState();
const [formView, setFormView] = useState();
const {userInfo} = useContext(Context);
const [loaded, setLoaded] = useState();

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
    // TO DO #1: ADD DOWNLOAD DOCUMENTS API VIEW
    // TO DO #2: REMOVE DOCUMENT FILE FROM BEIGN SENT THROUGH SERIALIZER ON FORM VIEW
    // TO DO #3: MAKE SURE DOCUMENTS ARE NOT SENT IN THE FORM TABLE VIEW
    console.log(response);
    for (let i = 0; i < response.data.length; i++){
    if (response.data[i].confirmation_number == confirmationNumber){
      setFormInfo(response.data[i])
      setFormView('applicant')
    }
  else if (response.data[i].admin_confirmation_number == confirmationNumber){
    setFormInfo(response.data[i])
    setFormView('administrator')
  }
}})
  .catch(error => {console.log(error.response)})
}

  return (
    <div>
<NavBar/>
    <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2">
    <Paper elevation={3} style = {{padding: 25, marginBottom: 40}}>

{formInfo && formView == 'applicant'?
formInfo.submitted?
<FormViewSubmitted formInfo = {formInfo}/>
        :<FormViewDraft retrievedFormInfo = {formInfo}/>
:null}
{formInfo && formView == 'administrator'?
formInfo.admin_submitted?
<FormViewSubmittedAdmin formInfo = {formInfo}/>
        :<FormViewDraftAdmin retrievedFormInfo = {formInfo}/>
        :null}

     </Paper>
    </div>
    </div>
    </div>
    </div>
  );
}