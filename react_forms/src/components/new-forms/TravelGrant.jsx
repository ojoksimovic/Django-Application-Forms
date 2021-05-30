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
} from "@material-ui/core";
import NavBar from "../app/NavBar";

function getSteps() {
  return [
    "Complete Form",
    "Review",
    "Submit",
  ];
}
function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return "Form goes here!";
    case 1:
      return "More Form here! Review..";
    case 2:
      return "Review and Submit buttons";
    default:
      return "Unknown stepIndex";
  }
}

export default function TravelGrant() {
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

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
        <Typography variant="h5">Research Travel Grant Application/Deferral Form</Typography>
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
            <Typography>{getStepContent(activeStep)}</Typography>
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
