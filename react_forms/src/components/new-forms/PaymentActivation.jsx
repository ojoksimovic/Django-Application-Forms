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
  Paper,
} from "@material-ui/core";
import NavBar from "../app/NavBar";
import { Context, withContext } from "../app/context";
import { useHistory } from "react-router-dom";
import ROUTE from "../app/route";


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
    createPaymentActivationForm,
    editPaymentActivationForm,
    getPaymentActivationForm,
    formInfo,
    setFormInfo,
  } = useContext(Context);

  // useEffect(() => {
  //   getPaymentActivationForm()
  // })

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
      !paymentType ||
      !startDateAward ||
      !confirm
    ) {
      setComplete(false);
    } else {
      setComplete(true);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      handleFormUpdate()
    }
  };

  const handleFormUpdate = () => {
    formInfo?.confirmation_number? 
    editPaymentActivationForm({
        confirmation_number: formInfo.confirmation_number,
        user: userInfo.username,
        faculty: faculty,
        graduate_unit: department,
        program: program,
        degree_start_date: startDateProgram,
        award: agency,
        award_duration: duration,
        type_payment_request: paymentType,
        award_start_session: startDateAward,
        submitted: submit,
      })
    : createPaymentActivationForm({
        user: userInfo.username,
        faculty: faculty,
        graduate_unit: department,
        program: program,
        degree_start_date: startDateProgram,
        award: agency,
        award_duration: duration,
        type_payment_request: paymentType,
        award_start_session: startDateAward,
        submitted: submit,
      });
  }

  const handleSubmit = () => {
    setSubmit(true)
    editPaymentActivationForm({
      confirmation_number: formInfo.confirmation_number,
      submitted: true,})
    history.push(ROUTE.MY_FORMS);

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
          <div ref={myRef}>
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
              gutterBottom
              variant="outlined"
              type="number"
              fullWidth
            />
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
              Faculty (required)
            </Typography>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-age-native-simple">
                Faculty
              </InputLabel>
              <Select
                error={!faculty && submitCheck}
                helperText={!faculty && submitCheck ? "Required field" : null}
                onChange={(e) =>
                  e.target.value
                    ? setFaculty(e.target.value)
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
                <option value={'Arts and Science'}>Arts and Science</option>
                <option value={'Medicine'}>Medicine</option>
                <option value={'Engineering'}>Engineering</option>
              </Select>
            </FormControl>
            <Typography
              gutterBottom
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
                helperText={!department && submitCheck ? "Required field" : null}
                onChange={(e) =>
                  e.target.value
                    ? setDepartment(e.target.value)
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
                <option value={'Ecology and Evolutionary Biology'}>Ecology and Evolutionary Biology</option>
                <option value={'Cell and Systems Biology'}>Cell and Systems Biology</option>
                <option value={'Computer Science'}>Computer Science</option>
              </Select>
            </FormControl>
            <Typography
              gutterBottom
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
                helperText={!program && submitCheck ? "Required field" : null}
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
                <option value={'Master of Science'}>Master of Science</option>
                <option value={'Master of Arts'}>Master of Arts</option>
                <option value={'Master of Applied Sciences'}>Master of Applied Sciences</option>
              </Select>
            </FormControl>
            <Typography
              gutterBottom
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
              gutterBottom
              variant="outlined"
              type="date"
              fullWidth
            />

            <Typography
              gutterBottom
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
            <Typography
              gutterBottom
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
                <FormControlLabel
                  control={<Radio color="primary" />}
                  value="12 months"
                  label="12 months"
                />
                <FormControlLabel
                  control={<Radio color="primary" />}
                  value="36 months"
                  label="36 months"
                />
                <Typography variant="caption" color="error">
                  {!duration && submitCheck ? "Required field" : null}
                </Typography>
              </RadioGroup>
            </FormControl>
            <Typography
              gutterBottom
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
            </FormControl>
            <Typography
              gutterBottom
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
              {studentNumber}
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
              {faculty}
            </Typography>
            <Typography
              gutterBottom
              variant="body1"
              className="form-field-title"
            >
              Graduate Unit (Department)
            </Typography>
            <Typography gutterBottom variant="body1">
              {department}
            </Typography>
            <Typography
              gutterBottom
              variant="body1"
              className="form-field-title"
            >
              Degree Program
            </Typography>
            <Typography gutterBottom variant="body1">
              {program}
            </Typography>
            <Typography
              gutterBottom
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
                <FormControlLabel
                  control={<Radio color="primary" />}
                  value="12 months"
                  label="12 months"
                />
                <FormControlLabel
                  control={<Radio color="primary" />}
                  value="36 months"
                  label="36 months"
                />
                <Typography variant="caption" color="error">
                  {!duration && submitCheck ? "Required field" : null}
                </Typography>
              </RadioGroup>
            </FormControl>
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
              <div>
                {activeStep === steps.length ? (
                  <div>
                    <Typography>All steps completed</Typography>
                    <Button onClick={handleReset}>Reset</Button>
                  </div>
                ) : (
                  <div>
                    <hr />
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
