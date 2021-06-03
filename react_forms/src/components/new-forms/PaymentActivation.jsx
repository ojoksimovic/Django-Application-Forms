import React, { useState, useContext, useEffect } from "react";
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
  Paper,
} from "@material-ui/core";
import NavBar from "../app/NavBar";
import { Context, withContext } from "../app/context";


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
  const [submit, setSubmit] = useState(true);

  

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

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };



  function getSteps() {
    return [
      "Complete Form",
      "Review",
      "Submit",
    ];
  }
  function getStepContent(stepIndex, userInfo) {
    switch (stepIndex) {
      case 0:
        return <div>
          <Typography gutterBottom variant = "body1" className = "form-field-title">
          First Name
          </Typography>
          <Typography gutterBottom variant = "body1">
          {userInfo?.first_name}
          </Typography>
          <Typography gutterBottom variant = "body1" className = "form-field-title">
            Last Name
          </Typography>
          <Typography gutterBottom variant = "body1">
          {userInfo?.last_name}
          </Typography>
          <Typography gutterBottom variant = "body1" className = "form-field-title">
            Student Number (required)
          </Typography>
          <TextField value = {studentNumber} error = {!studentNumber && submit} helperText = {!studentNumber && submit? "Required field":null} onChange = {(e)=> e.target.value?setStudentNumber(e.target.value):setStudentNumber(false)} gutterBottom variant="outlined" type = "number" fullWidth/>
          <Typography gutterBottom variant = "body1" className = "form-field-title">
            Email
          </Typography>
          <Typography gutterBottom variant = "body1">
          {userInfo?.email}
          </Typography>
  
          <Typography gutterBottom variant = "body1" className = "form-field-title">
            Faculty (required)
          </Typography>
          <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-age-native-simple">Faculty</InputLabel>
          <Select
          error = {!faculty && submit} helperText = {!faculty && submit? "Required field":null} onChange = {(e)=> e.target.value?setFaculty(e.target.value):setFaculty(false)}
            native
            value = {faculty}
            label="Faculty"
            inputProps={{
              name: 'faculty',
              id: 'outlined-faculty-native-simple',
            }}
          >
            <option aria-label="None" value="" />
            <option value={10}>Arts and Science</option>
            <option value={20}>Medicine</option>
            <option value={30}>Engineering</option>
          </Select>
        </FormControl>
          <Typography gutterBottom variant = "body1" className = "form-field-title">
            Graduate Unit (Department) (required)
          </Typography>
          <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-unit-native-simple">Graduate Unit</InputLabel>
          <Select
            error = {!department && submit} helperText = {!department && submit? "Required field":null} onChange = {(e)=> e.target.value?setDepartment(e.target.value):setDepartment(false)}
            native
            value = {department}
            // value={state.age}
            // onChange={handleChange}
            label="Graduate Unit"
            inputProps={{
              name: 'graduate unit',
              id: 'outlined-unit-native-simple',
            }}
          >
            <option aria-label="None" value="" />
            <option value={10}>Ecology and Evolutionary Biology</option>
            <option value={20}>Cell and Systems Biology</option>
            <option value={30}>Computer Science</option>
          </Select>
        </FormControl>
          <Typography gutterBottom variant = "body1" className = "form-field-title">
            Degree Program (required)
          </Typography>
          <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-degree-native-simple">Degree Program</InputLabel>
          <Select
            error = {!program && submit} helperText = {!program && submit? "Required field":null} onChange = {(e)=> e.target.value?setProgram(e.target.value):setProgram(false)}
            native
            value = {program}
            // value={state.age}
            // onChange={handleChange}
            label="Degree Program"
            inputProps={{
              name: 'degree program',
              id: 'outlined-degree-native-simple',
            }}
          >
            <option aria-label="None" value="" />
            <option value={10}>Master of Science</option>
            <option value={20}>Master of Arts</option>
            <option value={30}>Master of Applied Sciences</option>
          </Select>
        </FormControl>
          <Typography gutterBottom variant = "body1" className = "form-field-title">
            Start date of degree program (required)
          </Typography>
          <TextField value = {startDateProgram} error = {!startDateProgram && submit} helperText = {!startDateProgram && submit? "Required field":null} onChange = {(e)=> e.target.value?setStartDateProgram(e.target.value):setStartDateProgram(false)} gutterBottom variant="outlined" type = "date" fullWidth/>
  
          <Typography gutterBottom variant = "body1" className = "form-field-title">
            Please identify the funding agency (required)
          </Typography>
          <FormControl component="fieldset">
    <RadioGroup 
    value = {agency}
    onChange = {(e)=> e.target.value?setAgency(e.target.value):setAgency(false)}
    aria-label="agency" name="customized-radios">
      <FormControlLabel control={<Radio color = "primary"/>} value="CIHR"  label="CIHR" />
      <FormControlLabel control={<Radio color = "primary"/>} value="NSERC"  label="NSERC" />
      <FormControlLabel control={<Radio color = "primary"/>} value="SSHRC"  label="SSHRC" />
      <FormControlLabel control={<Radio color = "primary"/>} value="OGS"  label="OGS" />
      <FormControlLabel control={<Radio color = "primary"/>} value="QEII-GSST"  label="QEII-GSST" />
      <FormControlLabel control={<Radio color = "primary"/>} value="Trillium"  label="Trillium" />
      <FormControlLabel control={<Radio color = "primary"/>} value="Connaught"  label="Connaught" />
  
      <Typography variant = "caption" color = "error">{!agency && submit? "Required field":null}</Typography>
  
    </RadioGroup>
  </FormControl>
  <Typography gutterBottom variant = "body1" className = "form-field-title">
            Please indicate the duration (required)
          </Typography>
          <FormControl component="fieldset">
    <RadioGroup 
    value = {duration}
    onChange = {(e)=> e.target.value?setduration(e.target.value):setduration(false)}
    aria-label="duration" name="customized-radios">
      <FormControlLabel control={<Radio color = "primary" />} value="12 months"  label="12 months" />
      <FormControlLabel control={<Radio color = "primary" />} value="36 months"  label="36 months" />
      <Typography variant = "caption" color = "error">{!duration && submit? "Required field":null}</Typography>

    </RadioGroup>
  </FormControl>
  <Typography gutterBottom variant = "body1" className = "form-field-title">
            Type of payment requested (required)
          </Typography>
          <FormControl component="fieldset">
    <RadioGroup 
    value = {paymentType}
    onChange = {(e)=> e.target.value?setPaymentType(e.target.value):setPaymentType(false)}
    aria-label="payment-type" name="customized-radios">
      <FormControlLabel control={<Radio color = "primary" />} value="New activation"  label="New activation" />
      <FormControlLabel control={<Radio color = "primary" />} value="Renewal"  label="Renewal" />
      <Typography variant = "caption" color = "error">{!paymentType && submit? "Required field":null}</Typography>

    </RadioGroup>
  </FormControl>
          <Typography gutterBottom variant = "body1" className = "form-field-title">
            Requested start date (required)
          </Typography>
          <FormControl component="fieldset">
    <RadioGroup 
    value = {startDateAward}
    onChange = {(e)=> e.target.value?setStartDateAward(e.target.value):setStartDateAward(false)}
    aria-label="start-date" name="customized-radios">
      <FormControlLabel control={<Radio color = "primary" />} value="May 2021"  label="May 2021" />
      <FormControlLabel control={<Radio color = "primary" />} value="September 2021"  label="September 2021" />
      <FormControlLabel control={<Radio color = "primary" />} value="January 2022"  label="January 2022" />
      <Typography variant = "caption" color = "error">{!startDateAward && submit? "Required field":null}</Typography>

    </RadioGroup>
  </FormControl>
          <Typography gutterBottom variant = "body1" className = "form-field-title">
            Please confirm by checking the box below that:
          </Typography>
          <Typography gutterBottom variant = "body1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </Typography>
          <Typography gutterBottom variant = "body1" style = {{marginTop: 10}}>
            <strong>Note: </strong>Once submitted, the form will be sent to the administrator for approval.
          </Typography>
          <Typography gutterBottom variant = "body1">
            <Checkbox checked = {confirm} onChange = {(e => {setConfirm(e.target.checked)})} color = "primary" />I confirm that above
          </Typography>
          <Typography variant = "caption" color = "error">{!confirm && submit? "Required field":null}</Typography>
  
          </div>;
      case 1:
        return "More Form here! Review..";
      case 2:
        return "Review and Submit buttons";
      default:
        return "Unknown stepIndex";
    }
  }




  return (
    <div>
      <NavBar />
      <div className="container-fluid">
        <div className = "row">
          <div className = "col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2">
        <Typography variant="h5">Payment Activation Form</Typography>
      <hr/>
      <Paper elevation={3} style = {{padding: 20, margin: 20}}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
                    <hr/>
            {getStepContent(activeStep, userInfo)}
            <div>
            <hr/>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
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
