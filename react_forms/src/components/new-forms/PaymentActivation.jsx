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
import { useHistory } from "react-router-dom";
import ROUTE from "../app/route";
import axios from 'axios';
import axiosInstance from '../app/api';
import {departmentsObject} from './departments';

export default function PaymentActivation() {
  const [activeStep, setActiveStep] = useState(0);
  const [studentNumber, setStudentNumber] = useState();
  const [faculty, setFaculty] = useState();
  const [department, setDepartment] = useState();
  const [program, setProgram] = useState();
  const [startDateProgram, setStartDateProgram] = useState();
  const [agency, setAgency] = useState();
  const [duration, setduration] = useState();
  const [paymentType, setPaymentType] = useState();
  const [startDateAward, setStartDateAward] = useState();
  const [confirm, setConfirm] = useState();
  const [complete, setComplete] = useState();
  const [submitCheck, setSubmitCheck] = useState();
  const [submit, setSubmit] = useState(false);
  const [formInfo, setFormInfo] = useState();
  const [error, setError] = useState();
  const [departmentList, setDepartmentList] = useState([]);
  const [programList, setProgramList] = useState([]);
  const [file, setFile] = useState();
  const [pdfData, setPdfData] = useState();

  const history = useHistory();
  const myRef = useRef(null);

  const executeScroll = () => myRef.current.scrollIntoView();

  const steps = getSteps();
  const {
    userInfo,
    setUserInfo,
    getUserInfo,
    authentication,
    setAuthentication,
    state,
    setState,
  } = useContext(Context);

  const getPaymentActivationForm = () => {
    axiosInstance
    .get(
      '/api/payment-activation/'
    )
    .then(response => { console.log(response.data)
  })
    .catch(error => {setError(error.response.status)
    console.log(error.response)})
  }

  const createPaymentActivationForm = (data) => {
    axiosInstance
    .post(
      '/api/payment-activation/', data
    )
    .then(response => { setFormInfo(response.data)
  })
    .catch(error => {setError(error.response.status)
    console.log(error.response)})
  }

  const editPaymentActivationForm = (data, redirect) => {
    axiosInstance
    .patch(
      '/api/payment-activation/', data
    )
    .then(response => { setFormInfo(response.data)
      history.push(redirect);
  })
    .catch(error => {setError(error.response.status)
    console.log(error.response)})
  }

  useEffect(() => {
    // getPaymentActivationForm();
})

const getDepartments = (e) => {
  setFaculty(e)
  setDepartmentList([])
      for (let i = 0; i < departmentsObject.length; i++){
        if (departmentsObject[i].faculty == e) {  
          for (let j = 0; j < departmentsObject[i]['departments'].length; j++) {
setDepartmentList(departmentList => [...departmentList, departmentsObject[i]['departments'][j].department])
          }}
  }
}

const getPrograms = (e) => {
  setDepartment(e)
  setProgramList([])
      for (let i = 0; i < departmentsObject.length; i++){
        if (departmentsObject[i].faculty == faculty) {  
          for (let j = 0; j < departmentsObject[i]['departments'].length; j++) {
            if (departmentsObject[i]['departments'][j].department == e) {
              for (let k = 0; k < departmentsObject[i]['departments'][j].programs.length; k++) {
setProgramList(programList => [...programList, departmentsObject[i]['departments'][j].programs[k]])
          }}
  }
}}}

  const handleNext = () => {
    setSubmitCheck(true);
    executeScroll();
    if (
      !studentNumber ||
      !faculty ||
      !department ||
      !program ||
      !startDateProgram ||
      !agency ||
      !duration ||
      !startDateAward ||
      !confirm
    ) {
      setComplete(false);
    }
    else if (agency == 'Connaught' && !paymentType || agency == 'Trillium' && !paymentType){
      setComplete(false);
    }
    else {
      setComplete(true);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      handleFormUpdate()
    }
  };

  const handleFormUpdate = () => {
    formInfo?.confirmation_number? 
    editPaymentActivationForm({
        confirmation_number: formInfo.confirmation_number,
        student_number: studentNumber,
        user: userInfo.username,
        faculty: faculty,
        graduate_unit: department,
        program: program,
        degree_start_date: startDateProgram,
        award: agency,
        award_duration: duration,
        type_payment_request: paymentType,
        award_start_session: startDateAward,
        file: file,
        submitted: submit,
      })
    : createPaymentActivationForm({
        user: userInfo.username,
        student_number: studentNumber,
        faculty: faculty,
        graduate_unit: department,
        program: program,
        degree_start_date: startDateProgram,
        award: agency,
        award_duration: duration,
        type_payment_request: paymentType,
        award_start_session: startDateAward,
        file: file,
        submitted: submit,
      });
  }

  const renderSwitch = (agency) => {
    switch(agency){
      case 'CIHR':
      case 'NSERC':
      case 'SSHRC':
        return <><FormControlLabel
        control={<Radio color="primary" />}
        value="CGS M (12 months)"
        label="CGS M (12 months)"
      />
      <FormControlLabel
        control={<Radio color="primary" />}
        value="Vanier (36 months)"
        label="Vanier (36 months)"
      /></>
      case 'OGS':
        return <><FormControlLabel
        control={<Radio color="primary" />}
        value="OGS (2 sessions)"
        label="OGS (2 sessions)"
      />
      <FormControlLabel
        control={<Radio color="primary" />}
        value="OGS (3 sessions)"
        label="OGS (3 sessions)"
      /></>
      case 'QEII-GSST':
        return <><FormControlLabel
        control={<Radio color="primary" />}
        value="QEII-GSST (2 sessions)"
        label="QEII-GSST (2 sessions)"
      />
      <FormControlLabel
        control={<Radio color="primary" />}
        value="QEII-GSST (3 sessions)"
        label="QEII-GSST (3 sessions)"
      /></>
      case 'Connaught':
        return <FormControlLabel
        control={<Radio color="primary" />}
        value="Renewable annually and may be held for max of 4 years"
        label="Renewable annually and may be held for max of 4 years"
      />
      case 'Trillium':
       return  <FormControlLabel
        control={<Radio color="primary" />}
        value="Renewable annually and may be held for max of 4-5 years in accordance with program normal period of funding"
        label="Renewable annually and may be held for max of 4-5 years in accordance with program normal period of funding"
      />


    }
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    
      };

  const handleDocumentUpload = () => {
    console.log(file)
    const formData = new FormData();
    formData.append('file', file);
    axiosInstance
      .post('/api/upload/', formData)
        .then(response => console.log(response.data))
        .catch(error => console.log(error));
};

  const handleSubmit = () => {
    setSubmit(true)
    editPaymentActivationForm({
      confirmation_number: formInfo.confirmation_number,
      submitted: true,
    submitted_at: new Date().toISOString()
  },ROUTE.MY_FORMS)
      setUserInfo();

  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  function getSteps() {
    return ["Complete Form", "Review"];
  }
  function getStepContent(stepIndex, userInfo) {
    switch (stepIndex) {
      case 0:
        return (
          <div>
            <Typography
              variant="body1"
              className="form-field-title"
            >
              First Name
            </Typography>
            <Typography variant="body1">
              {userInfo?.first_name}
            </Typography>
            <Typography
             
              variant="body1"
              className="form-field-title"
            >
              Last Name
            </Typography>
            <Typography variant="body1">
              {userInfo?.last_name}
            </Typography>
            <Typography
              
              variant="body1"
              className="form-field-title"
            >
              Student Number (required)
            </Typography>
            <TextField
              value={studentNumber}
              error={!studentNumber && submitCheck}
              helperText={!studentNumber && submitCheck ? "Required field" : null}
              onChange={(e) =>
                e.target.value
                  ? setStudentNumber(e.target.value)
                  : setStudentNumber(false)
              }
              
              variant="outlined"
              type="number"
              fullWidth
            />
            <Typography
              variant="body1"
              className="form-field-title"
            >
              Email
            </Typography>
            <Typography variant="body1">
              {userInfo?.email}
            </Typography>

            <Typography

              variant="body1"
              className="form-field-title"
            >
              Faculty (required)
            </Typography>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-age-native-simple">
                Faculty
              </InputLabel>
              <Select
                error={!faculty && submitCheck}
                onChange={(e) =>
                  e.target.value
                    ? getDepartments(e.target.value)
                    : setFaculty(false)
                }
                native
                value={faculty}
                label="Faculty"
                inputProps={{
                  name: "faculty",
                  id: "outlined-faculty-native-simple",
                }}
              >
                <option aria-label="None" value="" />
                {departmentsObject.map((unit) =>
                <option value={unit.faculty}>{unit.faculty}</option>
  )}
              </Select>
              <Typography variant="caption" color="error">
                  {!faculty && submitCheck ? "Required field" : null}
                </Typography>
            </FormControl>
            <Typography
              variant="body1"
              className="form-field-title"
            >
              Graduate Unit (Department) (required)
            </Typography>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-unit-native-simple">
                Graduate Unit
              </InputLabel>
              <Select
                error={!department && submitCheck}
                onChange={(e) =>
                  e.target.value
                    ? getPrograms(e.target.value)
                    : setDepartment(false)
                }
                native
                value={department}
                // value={state.age}
                // onChange={handleChange}
                label="Graduate Unit"
                inputProps={{
                  name: "graduate unit",
                  id: "outlined-unit-native-simple",
                }}
              >
                <option aria-label="None" value="" />
                {departmentList?.map((unit) =>
                <option value={unit}>{unit}</option>
  )}
              </Select>
              <Typography variant="caption" color="error">
                  {!department && submitCheck ? "Required field" : null}
                </Typography>
            </FormControl>
            <Typography
              variant="body1"
              className="form-field-title"
            >
              Degree Program (required)
            </Typography>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-degree-native-simple">
                Degree Program
              </InputLabel>
              <Select
                error={!program && submitCheck}
                onChange={(e) =>
                  e.target.value
                    ? setProgram(e.target.value)
                    : setProgram(false)
                }
                native
                value={program}
                // value={state.age}
                // onChange={handleChange}
                label="Degree Program"
                inputProps={{
                  name: "degree program",
                  id: "outlined-degree-native-simple",
                }}
              >
                <option aria-label="None" value="" />

                {programList?.map((unit) =>
                <option value={unit}>{unit}</option>
  )}
              </Select>
              <Typography variant="caption" color="error">
                  {!program && submitCheck ? "Required field" : null}
                </Typography>
            </FormControl>
            <Typography
              variant="body1"
              className="form-field-title"
            >
              Start date of degree program (required)
            </Typography>
            <TextField
              value={startDateProgram}
              error={!startDateProgram && submitCheck}
              helperText={!startDateProgram && submitCheck ? "Required field" : null}
              onChange={(e) =>
                e.target.value
                  ? setStartDateProgram(e.target.value)
                  : setStartDateProgram(false)
              }
              variant="outlined"
              type="date"
              fullWidth
            />

            <Typography
              variant="body1"
              className="form-field-title"
            >
              Please identify the funding agency (required)
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup
                value={agency}
                onChange={(e) =>
                  e.target.value ? setAgency(e.target.value) : setAgency(false)
                }
                aria-label="agency"
                name="customized-radios"
              >
                <FormControlLabel
                  control={<Radio color="primary" />}
                  value="CIHR"
                  label="CIHR"
                />
                <FormControlLabel
                  control={<Radio color="primary" />}
                  value="NSERC"
                  label="NSERC"
                />
                <FormControlLabel
                  control={<Radio color="primary" />}
                  value="SSHRC"
                  label="SSHRC"
                />
                <FormControlLabel
                  control={<Radio color="primary" />}
                  value="OGS"
                  label="OGS"
                />
                <FormControlLabel
                  control={<Radio color="primary" />}
                  value="QEII-GSST"
                  label="QEII-GSST"
                />
                <FormControlLabel
                  control={<Radio color="primary" />}
                  value="Trillium"
                  label="Trillium"
                />
                <FormControlLabel
                  control={<Radio color="primary" />}
                  value="Connaught"
                  label="Connaught"
                />

                <Typography variant="caption" color="error">
                  {!agency && submitCheck ? "Required field" : null}
                </Typography>
              </RadioGroup>
            </FormControl>
            {agency?<>
            <Typography
              variant="body1"
              className="form-field-title"
            >
              Please indicate the duration (required)
            </Typography>

            <FormControl component="fieldset">
              <RadioGroup
                value={duration}
                onChange={(e) =>
                  e.target.value
                    ? setduration(e.target.value)
                    : setduration(false)
                }
                aria-label="duration"
                name="customized-radios"
              >
{renderSwitch(agency)}
                <Typography variant="caption" color="error">
                  {!duration && submitCheck ? "Required field" : null}
                </Typography>
              </RadioGroup>
            </FormControl>
            </>
            :null}
            {agency == 'Connaught' || agency == 'Trillium'?
            <><Typography
              variant="body1"
              className="form-field-title"
            >
              Type of payment requested (required)
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup
                value={paymentType}
                onChange={(e) =>
                  e.target.value
                    ? setPaymentType(e.target.value)
                    : setPaymentType(false)
                }
                aria-label="payment-type"
                name="customized-radios"
              >
                <FormControlLabel
                  control={<Radio color="primary" />}
                  value="New activation"
                  label="New activation"
                />
                <FormControlLabel
                  control={<Radio color="primary" />}
                  value="Renewal"
                  label="Renewal"
                />
                <Typography variant="caption" color="error">
                  {!paymentType && submitCheck ? "Required field" : null}
                </Typography>
              </RadioGroup>
            </FormControl></>
            :null}
            <Typography
              variant="body1"
              className="form-field-title"
            >
              Requested start date (required)
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup
                value={startDateAward}
                onChange={(e) =>
                  e.target.value
                    ? setStartDateAward(e.target.value)
                    : setStartDateAward(false)
                }
                aria-label="start-date"
                name="customized-radios"
              >
                <FormControlLabel
                  control={<Radio color="primary" />}
                  value="May 2021"
                  label="May 2021"
                />
                <FormControlLabel
                  control={<Radio color="primary" />}
                  value="September 2021"
                  label="September 2021"
                />
                <FormControlLabel
                  control={<Radio color="primary" />}
                  value="January 2022"
                  label="January 2022"
                />
                <Typography variant="caption" color="error">
                  {!startDateAward && submitCheck ? "Required field" : null}
                </Typography>
              </RadioGroup>
            </FormControl>
            <Typography
              variant="body1"
              className="form-field-title"
            >
              Additional Documentation
            </Typography>

            <div>
      <input
        accept="image/*"
        id="contained-button-file"
        multiple
        type="file"
        style = {{display: "none"}}
        onChange = {handleFileChange}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Upload
        </Button>
      </label>
      <Button variant = "contained" onClick={handleDocumentUpload}>Click Me!</Button>
    </div>
      <Typography
              variant="body1"
              className="form-field-title"
            >
              Please confirm by checking the box below that:
            </Typography>
            <Typography variant="body1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Typography>
            <Typography variant="body1" style={{ marginTop: 10 }}>
              <strong>Note: </strong>Once submitted, the form will be sent to
              the administrator for approval.
            </Typography>
            <Typography gutterBottom variant="body1">
              <Checkbox
                checked={confirm}
                onChange={(e) => {
                  setConfirm(e.target.checked);
                }}
                color="primary"
              />
              I confirm that above
            </Typography>
            <Typography variant="caption" color="error">
              {!confirm && submitCheck ? "Required field" : null}
            </Typography>
          </div>
        );
      case 1:
        return <div>
          <Alert severity="info">
  <AlertTitle style = {{fontWeight: 800}}>You are almost done.</AlertTitle>
  Please review the information below to ensure it is accurate, then click <strong>Submit</strong> at the bottom of the page.
</Alert>
           <Typography
              variant="body1"
              className="form-field-title"
            >
              First Name
            </Typography>
            <Typography variant="body1">
              {userInfo?.first_name}
            </Typography>
            <Typography
              variant="body1"
              className="form-field-title"
            >
              Last Name
            </Typography>
            <Typography variant="body1">
              {userInfo?.last_name}
            </Typography>
            <Typography
              variant="body1"
              className="form-field-title"
            >
              Student Number
            </Typography>
            <Typography variant="body1">
              {studentNumber}
            </Typography>
            <Typography
              variant="body1"
              className="form-field-title"
            >
              Email
            </Typography>
            <Typography variant="body1">
              {userInfo?.email}
            </Typography>
            <Typography
              variant="body1"
              className="form-field-title"
            >
              Faculty
            </Typography>
            <Typography variant="body1">
              {faculty}
            </Typography>
            <Typography
  
              variant="body1"
              className="form-field-title"
            >
              Graduate Unit (Department)
            </Typography>
            <Typography  variant="body1">
              {department}
            </Typography>
            <Typography
              variant="body1"
              className="form-field-title"
            >
              Degree Program
            </Typography>
            <Typography  variant="body1">
              {program}
            </Typography>
            <Typography
              variant="body1"
              className="form-field-title"
            >
              Start date of degree program
            </Typography>
            <Typography gutterBottom variant="body1">
              {startDateProgram}
            </Typography>
            <Typography
              gutterBottom
              variant="body1"
              className="form-field-title"
            >
              Please identify the funding agency (required)
            </Typography>
            <FormControl disabled component="fieldset">
              <RadioGroup
              
                value={agency}
                onChange={(e) =>
                  e.target.value ? setAgency(e.target.value) : setAgency(false)
                }
                aria-label="agency"
                name="customized-radios"
              >
                <FormControlLabel
                  control={<Radio color="primary" />}
                  value="CIHR"
                  label="CIHR"
                />
                <FormControlLabel
                  control={<Radio color="primary" />}
                  value="NSERC"
                  label="NSERC"
                />
                <FormControlLabel
                  control={<Radio color="primary" />}
                  value="SSHRC"
                  label="SSHRC"
                />
                <FormControlLabel
                  control={<Radio color="primary" />}
                  value="OGS"
                  label="OGS"
                />
                <FormControlLabel
                  control={<Radio color="primary" />}
                  value="QEII-GSST"
                  label="QEII-GSST"
                />
                <FormControlLabel
                  control={<Radio color="primary" />}
                  value="Trillium"
                  label="Trillium"
                />
                <FormControlLabel
                  control={<Radio color="primary" />}
                  value="Connaught"
                  label="Connaught"
                />

                <Typography variant="caption" color="error">
                  {!agency && submitCheck ? "Required field" : null}
                </Typography>
              </RadioGroup>
            </FormControl>
            <Typography
              gutterBottom
              variant="body1"
              className="form-field-title"
            >
              Please indicate the duration (required)
            </Typography>
            <FormControl disabled component="fieldset">
              <RadioGroup
                value={duration}
                onChange={(e) =>
                  e.target.value
                    ? setduration(e.target.value)
                    : setduration(false)
                }
                aria-label="duration"
                name="customized-radios"
              >
{renderSwitch(agency)}

                <Typography variant="caption" color="error">
                  {!duration && submitCheck ? "Required field" : null}
                </Typography>
              </RadioGroup>
            </FormControl>
            {agency == 'Connaught' || agency == 'Trillium'?
            <>
            <Typography
              gutterBottom
              variant="body1"
              className="form-field-title"
            >
              Type of payment requested (required)
            </Typography>
            <FormControl disabled component="fieldset">
              <RadioGroup
                value={paymentType}
                onChange={(e) =>
                  e.target.value
                    ? setPaymentType(e.target.value)
                    : setPaymentType(false)
                }
                aria-label="payment-type"
                name="customized-radios"
              >
                <FormControlLabel
                  control={<Radio color="primary" />}
                  value="New activation"
                  label="New activation"
                />
                <FormControlLabel
                  control={<Radio color="primary" />}
                  value="Renewal"
                  label="Renewal"
                />
                <Typography variant="caption" color="error">
                  {!paymentType && submitCheck ? "Required field" : null}
                </Typography>
              </RadioGroup>
            </FormControl>
            </>
            :null}
            <Typography
              gutterBottom
              variant="body1"
              className="form-field-title"
            >
              Requested start date (required)
            </Typography>
            <FormControl disabled component="fieldset">
              <RadioGroup
                value={startDateAward}
                onChange={(e) =>
                  e.target.value
                    ? setStartDateAward(e.target.value)
                    : setStartDateAward(false)
                }
                aria-label="start-date"
                name="customized-radios"
              >
                <FormControlLabel
                  control={<Radio color="primary" />}
                  value="May 2021"
                  label="May 2021"
                />
                <FormControlLabel
                  control={<Radio color="primary" />}
                  value="September 2021"
                  label="September 2021"
                />
                <FormControlLabel
                  control={<Radio color="primary" />}
                  value="January 2022"
                  label="January 2022"
                />
                <Typography variant="caption" color="error">
                  {!startDateAward && submitCheck ? "Required field" : null}
                </Typography>
              </RadioGroup>
            </FormControl>
            <Typography
              variant="body1"
              className="form-field-title"
            >
              Additional Documentation
            </Typography>

            {/* INSERT DOCUMENT HYPERLINKS */}
            <Typography
              gutterBottom
              variant="body1"
              className="form-field-title"
            >
              Please confirm by checking the box below that:
            </Typography>
            <Typography gutterBottom variant="body1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Typography>
            <Typography gutterBottom variant="body1" style={{ marginTop: 10 }}>
              <strong>Note: </strong>Once submitted, the form will be sent to
              the administrator for approval.
            </Typography>
            <Typography gutterBottom variant="body1">
              <Checkbox disabled
                checked={confirm}
                onChange={(e) => {
                  setConfirm(e.target.checked);
                }}
                color="primary"
              />
              I confirm that above
            </Typography>
            <Typography variant="caption" color="error">
              {!confirm && submitCheck ? "Required field" : null}
            </Typography>
        </div>;
      default:
        return "Unknown stepIndex";
    }
  }

  return (
    <div>
      <NavBar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2">
            <Typography variant="h5">Payment Activation Form</Typography>
            <hr />
            <Paper elevation={3} style={{ padding: 20, margin: 20 }}>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <hr />
              <div ref={myRef}>
              <Typography className="form-field-title" gutterBottom variant = 'h6'>Payment Activation Form</Typography>
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
            </Paper>
          </div>
        </div>
      </div>
    </div>
  );
}
