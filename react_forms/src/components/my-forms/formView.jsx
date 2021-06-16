import React, { useState, useContext, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Checkbox,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  InputLabel,
  Select,
  Paper
} from "@material-ui/core";
import {Alert, AlertTitle} from '@material-ui/lab'
import NavBar from "../app/NavBar";
import { Context, withContext } from "../app/context";
import { useHistory, useParams } from "react-router-dom";
import ROUTE from "../app/route";
import axios from 'axios';
import axiosInstance from '../app/api';
import FormViewSubmitted from "./formViewSubmitted";
import FormViewDraft from "./formViewDraft";

export default function FormView() {  

const history = useHistory();
const { confirmationNumber} = useParams();
const [formInfo, setFormInfo] = useState();
const {userInfo} = useContext(Context);
const [submitCheck, setSubmitCheck] = useState();
const [submit, setSubmit] = useState(false);
const [studentNumber, setStudentNumber] = useState();

useEffect(()=> {
  if (!formInfo){
  getPaymentActivationForm()
  }
})
const getPaymentActivationForm = () => {
  axiosInstance
  .get(
    '/api/payment-activation/'
    // + confirmationNumber
  )
  .then(response => { for (let i = 0; i < response.data.length; i++){
    if (response.data[i].confirmation_number == confirmationNumber){
      setFormInfo(response.data[i])
      console.log(response.data[i])
    }}
})
  .catch(error => {console.log(error.response)})
}

  return (
    <div>
<NavBar/>
    <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2">
    <Paper elevation={3} style = {{padding: 25, marginBottom: 40}}>

{formInfo?
formInfo.submitted?
<FormViewSubmitted formInfo = {formInfo}/>
        :<FormViewDraft retrievedFormInfo = {formInfo}/>
      :null}
     </Paper>
    </div>
    </div>
    </div>
    </div>
  );
}