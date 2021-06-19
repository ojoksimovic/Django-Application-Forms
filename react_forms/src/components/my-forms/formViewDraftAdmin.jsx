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
import { departmentsObject } from "../new-forms/departments";




export default function FormViewDraftAdmin({retrievedFormInfo}) {  

    const [activeStep, setActiveStep] = useState(0);

    const [complete, setComplete] = useState();
    const [submitCheck, setSubmitCheck] = useState();
    const [submit, setSubmit] = useState(false);
    const [confirm, setConfirm] = useState();
    const [error, setError] = useState();
    const [formInfo, setFormInfo] = useState(retrievedFormInfo);
    const [departmentList, setDepartmentList] = useState([]);
    const [programList, setProgramList] = useState([]);
  
  
    const history = useHistory();
    const myRef = useRef(null);
  
    const executeScroll = () => myRef.current.scrollIntoView();
  
    const steps = getSteps();
    const {
      userInfo,
      setUserInfo,
      convertDate
    } = useContext(Context);
  
    const getPaymentActivationForm = () => {
      axiosInstance
      .get(
        '/api/payment-activation/'
      )
      .then(response => {
    })
      .catch(error => {setError(error.response.status)
      console.log(error.response)})
    }
  
  
    const editPaymentActivationForm = (data) => {
      axiosInstance
      .patch(
        '/api/payment-activation/', data
      )
      .then(response => { setFormInfo(response.data)
    })
      .catch(error => {setError(error.response.status)
      console.log(error.response)})
    }
  
  

  
    const handleNext = () => {
    //   setSubmitCheck(true);
    //   executeScroll();
    //   if (
    //     !formInfo.student_number ||
    //     !formInfo.faculty ||
    //     !formInfo.graduate_unit ||
    //     !formInfo.program ||
    //     !formInfo.degree_start_date ||
    //     !formInfo.award ||
    //     !formInfo.award_duration ||
    //     !formInfo.award_start_session ||
    //     !confirm
    //   ) {
    //     setComplete(false);
    //   }
    //   else if (formInfo.award == 'Connaught' && !formInfo.type_payment_request || formInfo.award == 'Trillium' && !formInfo.type_payment_request){
    //     setComplete(false);
    //   }
    //   else {
    //     setComplete(true);
    //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
    //     handleFormUpdate()
    //   }
    };
  
    const handleFormUpdate = () => {
      editPaymentActivationForm({
          confirmation_number: formInfo.confirmation_number,
          student_number: formInfo.student_number,
          user: userInfo.username,
          faculty: formInfo.faculty,
          graduate_unit: formInfo.graduate_unit,
          program: formInfo.program,
          degree_start_date: formInfo.degree_start_date,
          award: formInfo.award,
          award_duration: formInfo.award_duration,
          type_payment_request: formInfo.type_payment_request,
          award_start_session: formInfo.award_start_session,
          submitted: formInfo.submitted,
        })
    }
  
    const handleSubmit = () => {
      setSubmit(true)
      editPaymentActivationForm({
        confirmation_number: formInfo.confirmation_number,
        submitted: true,})
        setUserInfo();
      history.push(ROUTE.MY_FORMS);
  
    }
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleReset = () => {
      setActiveStep(0);
    };
  
    function getSteps() {
      return ["Complete Administrator Form", "Review"];
    }
    function getStepContent(stepIndex, userInfo) {
      switch (stepIndex) {
        case 0:
          return (
            <div>
           <Typography
              gutterBottom
              variant="body1"
              className="form-field-title"
            >
              First Name
            </Typography>
            <Typography gutterBottom variant="body1">
              {userInfo?.first_name}
            </Typography>
            <Typography
              gutterBottom
              variant="body1"
              className="form-field-title"
            >
              Last Name
            </Typography>
            <Typography gutterBottom variant="body1">
              {userInfo?.last_name}
            </Typography>
            <Typography
              gutterBottom
              variant="body1"
              className="form-field-title"
            >
              Student Number
            </Typography>
          
            <Typography gutterBottom variant="body1">
              {formInfo.student_number}
            </Typography>
            <Typography
              gutterBottom
              variant="body1"
              className="form-field-title"
            >
              Email
            </Typography>
            <Typography gutterBottom variant="body1">
              {userInfo?.email}
            </Typography>
            <Typography
              gutterBottom
              variant="body1"
              className="form-field-title"
            >
              Faculty
            </Typography>
            <Typography gutterBottom variant="body1">
              {formInfo.faculty}
            </Typography>
            <Typography
              gutterBottom
              variant="body1"
              className="form-field-title"
            >
              Graduate Unit (Department)
            </Typography>
            <Typography gutterBottom variant="body1">
              {formInfo.graduate_unit}
            </Typography>
            <Typography
              gutterBottom
              variant="body1"
              className="form-field-title"
            >
              Degree Program
            </Typography>
            <Typography gutterBottom variant="body1">
              {formInfo.program}
            </Typography>
            <Typography
              gutterBottom
              variant="body1"
              className="form-field-title"
            >
              Start date of degree program
            </Typography>
            <Typography gutterBottom variant="body1">
              {formInfo.degree_start_date}
            </Typography>
            <Typography
              gutterBottom
              variant="body1"
              className="form-field-title"
            >
              Funding agency (required)
            </Typography>
            <Typography gutterBottom variant="body1">
              {formInfo.award}
            </Typography>
            <Typography
              gutterBottom
              variant="body1"
              className="form-field-title"
            >
              Duration (required)
            </Typography>
            <Typography gutterBottom variant="body1">
              {formInfo.award_duration}
            </Typography>

            {formInfo.award == 'Connaught' || formInfo.award == 'Trillium'?
            <>
            <Typography
              gutterBottom
              variant="body1"
              className="form-field-title"
            >
              Type of payment requested (required)
            </Typography>
            <Typography variant = 'body1'>{formInfo.type_payment_request}</Typography>
            </>
            :null}
            <Typography
              gutterBottom
              variant="body1"
              className="form-field-title"
            >
              Requested start date (required)
            </Typography>
            <Typography variant = 'body1'> {formInfo.award_start_session}</Typography>
            <Typography
              gutterBottom
              variant="body1"
              className="form-field-title"
            >
              Submitted: {convertDate(formInfo.modified_at)}
            </Typography>
            </div>
            )
        default:
          return "Unknown stepIndex";
          }
    }
  
    return (
      <div>
                <Stepper activeStep={activeStep} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                <hr />
                <div ref={myRef}>
                <Typography className="form-field-title" gutterBottom variant = 'h6'>Administrator - Payment Activation Form</Typography>
                <Typography gutterBottom variant = 'body2'>This form is used to activate payment.</Typography>
                <hr />
                <Typography className="form-field-title" gutterBottom variant = 'h6'>User Information</Typography>
                  {activeStep === steps.length ? (
                    <div>
                      <Typography>All steps completed</Typography>
                      <Button onClick={handleReset}>Reset</Button>
                    </div>
                  ) : (
                    <div>
    
                      {getStepContent(activeStep, userInfo)}
                      <div>
                        <hr />
                        <Button disabled={activeStep === 0} onClick={handleBack}>
                          Back
                        </Button>
                        {activeStep === steps.length - 1 ? null :
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={handleFormUpdate}
                        >  Save
                        </Button>}
                        {activeStep === steps.length - 1 ?
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleSubmit}
                        > Submit
                        </Button> 
                        :                       <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                      > Next
                      </Button>}
                      </div>
                    </div>
                  )}
                </div>
            </div>
    );
  }
  