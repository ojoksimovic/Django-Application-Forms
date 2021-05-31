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
} from "@material-ui/core";
import NavBar from "../app/NavBar";
import { Context, withContext } from "../app/context";

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
        <Typography gutterBottom variant = "body1" style = {{fontWeight: 800}}>
        First Name
        </Typography>
        <Typography gutterBottom variant = "body1">
        {userInfo?.first_name}
        </Typography>
        <Typography gutterBottom variant = "body1" style = {{fontWeight: 800}}>
          Last Name
        </Typography>
        <Typography gutterBottom variant = "body1">
        {userInfo?.last_name}
        </Typography>
        <Typography gutterBottom variant = "body1" style = {{fontWeight: 800}}>
          Student Number
        </Typography>
        <TextField gutterBottom variant="outlined" type = "number" fullWidth/>
        <Typography gutterBottom variant = "body1" style = {{fontWeight: 800}}>
          Email
        </Typography>
        <Typography gutterBottom variant = "body1">
        {userInfo?.email}
        </Typography>

        <Typography gutterBottom variant = "body1" style = {{fontWeight: 800}}>
          Faculty (required)
        </Typography>
        <FormControl variant="outlined" fullWidth>
        <InputLabel htmlFor="outlined-age-native-simple">Faculty</InputLabel>
        <Select
          native
          // value={state.age}
          // onChange={handleChange}
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
        <Typography gutterBottom variant = "body1" style = {{fontWeight: 800}}>
          Graduate Unit (Department) (required)
        </Typography>
        <FormControl variant="outlined" fullWidth>
        <InputLabel htmlFor="outlined-unit-native-simple">Graduate Unit</InputLabel>
        <Select
          native
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
        <Typography gutterBottom variant = "body1" style = {{fontWeight: 800}}>
          Degree Program (required)
        </Typography>
        <FormControl variant="outlined" fullWidth>
        <InputLabel htmlFor="outlined-degree-native-simple">Degree Program</InputLabel>
        <Select
          native
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
        <Typography gutterBottom variant = "body1" style = {{fontWeight: 800}}>
          Start date of degree program (required)
        </Typography>
        <TextField gutterBottom variant="outlined" type = "date" fullWidth/>

        <Typography gutterBottom variant = "body1" style = {{fontWeight: 800}}>
          Please identify the funding agency (required)
        </Typography>
        <FormControl component="fieldset">
  <RadioGroup aria-label="gender" name="customized-radios">
    <FormControlLabel control={<Radio color = "primary"/>} value="CIHR"  label="CIHR" />
    <FormControlLabel control={<Radio color = "primary"/>} value="NSERC"  label="NSERC" />
    <FormControlLabel control={<Radio color = "primary"/>} value="SSHRC"  label="SSHRC" />
    <FormControlLabel control={<Radio color = "primary"/>} value="OGS"  label="OGS" />
    <FormControlLabel control={<Radio color = "primary"/>} value="QEII-GSST"  label="QEII-GSST" />
    <FormControlLabel control={<Radio color = "primary"/>} value="Trillium"  label="Trillium" />
    <FormControlLabel control={<Radio color = "primary"/>} value="Connaught"  label="Connaught" />


  </RadioGroup>
</FormControl>
        <Typography gutterBottom variant = "body1" style = {{fontWeight: 800}}>
          Requested start date (required)
        </Typography>
        <FormControl component="fieldset">
  <RadioGroup aria-label="gender" name="customized-radios">
    <FormControlLabel control={<Radio color = "primary" />} value="May 2021"  label="May 2021" />
    <FormControlLabel control={<Radio color = "primary" />} value="September 2021"  label="September 2021" />
    <FormControlLabel control={<Radio color = "primary" />} value="January 2022"  label="January 2022" />

  </RadioGroup>
</FormControl>
        <Typography gutterBottom variant = "body1" style = {{fontWeight: 800}}>
          Please confirm by checking the box below that:
        </Typography>
        <Typography gutterBottom variant = "body1">
          Blah Blah Blah
        </Typography>
        <Typography gutterBottom variant = "body1">
          <strong>Note: </strong>Once submitted, the form will be sent to the administrator for approval.
        </Typography>
        <Typography gutterBottom variant = "body1">
          <Checkbox color = "primary" />I confirm that above
        </Typography>

        </div>;
    case 1:
      return "More Form here! Review..";
    case 2:
      return "Review and Submit buttons";
    default:
      return "Unknown stepIndex";
  }
}

export default function PaymentActivation() {
  const [activeStep, setActiveStep] = React.useState(0);
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
  return (
    <div>
      <NavBar />
      <div className="container-fluid">
        <Typography variant="h5">Payment Activation Form</Typography>
      </div>
      <hr/>
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

    </div>
  );
}
