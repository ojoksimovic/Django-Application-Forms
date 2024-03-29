import {
  Button,
  Checkbox,
  Dialog,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputAdornment,
  LinearProgress,
  Link,
  Radio,
  RadioGroup,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import "bootstrap/dist/css/bootstrap.css";
import React, { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import axiosInstance from "../app/api";
import { Context } from "../app/context";
import ROUTE from "../app/route";

export default function FormViewDraftAdmin({ retrievedFormInfo }) {
  const [activeStep, setActiveStep] = useState(0);

  const [complete, setComplete] = useState();
  const [submitCheck, setSubmitCheck] = useState();
  const [submit, setSubmit] = useState(false);
  const [saved, setSaved] = useState();
  const [confirm, setConfirm] = useState();
  const [error, setError] = useState();
  const [formInfo, setFormInfo] = useState(retrievedFormInfo);

  const history = useHistory();
  const myRef = useRef(null);

  const executeScroll = () => myRef.current.scrollIntoView();

  const steps = getSteps();
  const { userInfo, setUserInfo, convertDate, handleFileDownload } =
    useContext(Context);

  const getPaymentActivationForm = () => {
    axiosInstance
      .get("/api/payment-activation/")
      .then((response) => {})
      .catch((error) => {
        setError(error.response.status);
        console.log(error.response);
      });
  };

  const editPaymentActivationForm = (data, redirect) => {
    axiosInstance
      .patch("/api/payment-activation/", data, 
      {timeout:30000})
      .then((response) => {
        setFormInfo(response.data);
        redirect ? history.push(redirect) : setSaved(true);
        setTimeout(function () {
          window.scrollTo(0, 0);
        }, 2);
      })
      .catch((error) => {
        setError(error.response.status);
        console.log(error.response);
      });
  };

  const handleNext = () => {
    setSubmitCheck(true);
    executeScroll();
    if (
      (formInfo.award_duration == "CGS M (12 months)" &&
        !formInfo.admin_research_requirement) ||
      (formInfo.award == "OGS" && !formInfo.admin_matching_portion) ||
      (formInfo.award == "Connaught" &&
        !formInfo.admin_departmental_award &&
        !formInfo.admin_utf &&
        !formInfo.admin_ta &&
        !formInfo.admin_ra) ||
      (formInfo.award == "Trillium" &&
        !formInfo.admin_departmental_award &&
        !formInfo.admin_utf &&
        !formInfo.admin_ta &&
        !formInfo.admin_ra) ||
      !confirm
    ) {
      setComplete(false);
    } else {
      setComplete(true);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      //scroll to top needs short timout in order to work
      setTimeout(function () {
        window.scrollTo(0, 0);
      }, 2);
      handleFormUpdate();
    }
  };

  const handleSave = () => {
    setSubmitCheck(true);
    executeScroll();
    if (
      (formInfo.award_duration == "CGS M (12 months)" &&
        !formInfo.admin_research_requirement) ||
      (formInfo.award == "OGS" && !formInfo.admin_matching_portion) ||
      (formInfo.award == "Connaught" &&
        !formInfo.admin_departmental_award &&
        !formInfo.admin_utf &&
        !formInfo.admin_ta &&
        !formInfo.admin_ra) ||
      (formInfo.award == "Trillium" &&
        !formInfo.admin_departmental_award &&
        !formInfo.admin_utf &&
        !formInfo.admin_ta &&
        !formInfo.admin_ra) ||
      !confirm
    ) {
      setComplete(false);
    } else {
      setComplete(true);
      handleFormUpdate();
    }
  };

  const handleFormUpdate = () => {
    editPaymentActivationForm({
      confirmation_number: formInfo.confirmation_number,
      admin_research_requirement: formInfo.admin_research_requirement,
      admin_matching_portion: formInfo.admin_matching_portion,
      admin_utf: formInfo.admin_utf,
      admin_departmental_award: formInfo.admin_departmental_award,
      admin_ta: formInfo.admin_ta,
      admin_ra: formInfo.admin_ra,
      admin_other_source: formInfo.admin_other_source,
      admin_payment_notes: formInfo.admin_payment_notes,
      admin_award_letter_notes: formInfo.admin_award_letter_notes,
      admin_user: userInfo.username,
      admin_submitted: formInfo.admin_submitted,
    });
  };

  const handleSubmit = () => {
    setSubmit(true);
    editPaymentActivationForm(
      {
        confirmation_number: formInfo.confirmation_number,
        admin_submitted: true,
        admin_submitted_at: new Date().toISOString(),
      },
      ROUTE.MY_FORMS
    );
    setUserInfo();
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setSaved(false);
    setTimeout(function () {
      window.scrollTo(0, 0);
    }, 2);
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
            {saved ? (
              <Alert severity="info">
                <AlertTitle style={{ fontWeight: 800 }}>
                  Your progress is saved.
                </AlertTitle>
                Please review the information below to ensure it is accurate,
                then click <strong>Next</strong> at the bottom of the page to
                continue to submission.
              </Alert>
            ) : (
              <></>
            )}
            <Typography
              gutterBottom
              variant="body1"
              className="form-field-title"
            >
              First Name
            </Typography>
            <Typography gutterBottom variant="body1">
              {formInfo.first_name}
            </Typography>
            <Typography
              gutterBottom
              variant="body1"
              className="form-field-title"
            >
              Last Name
            </Typography>
            <Typography gutterBottom variant="body1">
              {formInfo.last_name}
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
              {formInfo.email}
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

            {formInfo.award == "Connaught" || formInfo.award == "Trillium" ? (
              <>
                <Typography
                  gutterBottom
                  variant="body1"
                  className="form-field-title"
                >
                  Type of payment requested (required)
                </Typography>
                <Typography variant="body1">
                  {formInfo.type_payment_request}
                </Typography>
              </>
            ) : null}
            <Typography
              gutterBottom
              variant="body1"
              className="form-field-title"
            >
              Requested start date (required)
            </Typography>
            <Typography variant="body1">
              {" "}
              {formInfo.award_start_session}
            </Typography>

            <Typography variant="body1" className="form-field-title">
              Additional Documentation
            </Typography>
            {formInfo?.documents?.map((document) => (
              <Typography variant="subtitle2">
                <Link
                  style={{ cursor: "pointer" }}
                  underline="hover"
                  onClick={() => {
                    handleFileDownload(document);
                  }}
                >
                  {document.name}
                </Link>
              </Typography>
            ))}

            <Typography
              gutterBottom
              variant="body1"
              className="form-field-title"
            >
              Submitted: {convertDate(formInfo.submitted_at)}
            </Typography>
            <hr />
            <Typography className="form-field-title" gutterBottom variant="h6">
              Administration Information
            </Typography>
            <hr />
            {formInfo?.award_duration == "CGS M (12 months)" ? (
              <>
                <Typography variant="body1" className="form-field-title">
                  Indicate the nature of the research requirement(s) of the
                  awardee's program (required)
                </Typography>
                <FormControl component="fieldset">
                  <RadioGroup
                    value={formInfo?.admin_research_requirement}
                    onChange={(e) =>
                      e.target.value
                        ? setFormInfo((formInfo) => ({
                            ...formInfo,
                            admin_research_requirement: e.target.value,
                          }))
                        : setFormInfo((formInfo) => ({
                            ...formInfo,
                            admin_research_requirement: null,
                          }))
                    }
                    aria-label="start-date"
                    name="customized-radios"
                  >
                    <FormControlLabel
                      control={<Radio color="primary" />}
                      value="Thesis"
                      label="Thesis"
                    />
                    <FormControlLabel
                      control={<Radio color="primary" />}
                      value="Major Research Project/Paper"
                      label="Major Research Project/Paper"
                    />
                    <FormControlLabel
                      control={<Radio color="primary" />}
                      value="Other (specify)"
                      label="Other (specify)"
                    />
                    <Typography variant="caption" color="error">
                      {!formInfo.admin_research_requirement && submitCheck
                        ? "Required field"
                        : null}
                    </Typography>
                  </RadioGroup>
                </FormControl>
              </>
            ) : null}

            {formInfo?.award == "OGS" ? (
              <>
                <Typography variant="body1" className="form-field-title">
                  Matching portion will be paid from (required)
                </Typography>
                <FormControl component="fieldset">
                  <RadioGroup
                    value={formInfo?.admin_matching_portion}
                    onChange={(e) =>
                      e.target.value
                        ? setFormInfo((formInfo) => ({
                            ...formInfo,
                            admin_matching_portion: e.target.value,
                          }))
                        : setFormInfo((formInfo) => ({
                            ...formInfo,
                            admin_matching_portion: null,
                          }))
                    }
                    aria-label="start-date"
                    name="customized-radios"
                  >
                    <FormControlLabel
                      control={<Radio color="primary" />}
                      value="Non-RA Department resource (eg UTF or named OGS"
                      label="Non-RA Department resource (eg UTF or named OGS"
                    />
                    <FormControlLabel
                      control={<Radio color="primary" />}
                      value="Research assistantship through payroll"
                      label="Research assistantship through payroll"
                    />
                    <Typography variant="caption" color="error">
                      {!formInfo.admin_matching_portion && submitCheck
                        ? "Required field"
                        : null}
                    </Typography>
                  </RadioGroup>
                </FormControl>
              </>
            ) : null}
            {formInfo?.award == "Connaught" || formInfo?.award == "Trillium" ? (
              <>
                <Typography variant="body1" className="form-field-title">
                  UTF (required)
                </Typography>
                <TextField
                  value={formInfo.admin_utf}
                  error={!formInfo.admin_utf && submitCheck}
                  helperText={
                    !formInfo.admin_utf && submitCheck ? "Required field" : null
                  }
                  onChange={(e) =>
                    e.target.value
                      ? setFormInfo((formInfo) => ({
                          ...formInfo,
                          admin_utf: e.target.value,
                        }))
                      : setFormInfo((formInfo) => ({
                          ...formInfo,
                          admin_utf: null,
                        }))
                  }
                  variant="outlined"
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  fullWidth
                />

                <Typography variant="body1" className="form-field-title">
                  Departmental/Endowment (required)
                </Typography>
                <TextField
                  value={formInfo.admin_departmental_award}
                  error={!formInfo.admin_departmental_award && submitCheck}
                  helperText={
                    !formInfo.admin_departmental_award && submitCheck
                      ? "Required field"
                      : null
                  }
                  onChange={(e) =>
                    e.target.value
                      ? setFormInfo((formInfo) => ({
                          ...formInfo,
                          admin_departmental_award: e.target.value,
                        }))
                      : setFormInfo((formInfo) => ({
                          ...formInfo,
                          admin_departmental_award: null,
                        }))
                  }
                  variant="outlined"
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  fullWidth
                />

                <Typography variant="body1" className="form-field-title">
                  Teaching Assistantship (required)
                </Typography>
                <TextField
                  value={formInfo.admin_ta}
                  error={!formInfo.admin_ta && submitCheck}
                  helperText={
                    !formInfo.admin_ta && submitCheck ? "Required field" : null
                  }
                  onChange={(e) =>
                    e.target.value
                      ? setFormInfo((formInfo) => ({
                          ...formInfo,
                          admin_ta: e.target.value,
                        }))
                      : setFormInfo((formInfo) => ({
                          ...formInfo,
                          admin_ta: null,
                        }))
                  }
                  variant="outlined"
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  fullWidth
                />

                <Typography variant="body1" className="form-field-title">
                  Research Assistantship (required)
                </Typography>
                <TextField
                  value={formInfo.admin_ra}
                  error={!formInfo.admin_ra && submitCheck}
                  helperText={
                    !formInfo.admin_ra && submitCheck ? "Required field" : null
                  }
                  onChange={(e) =>
                    e.target.value
                      ? setFormInfo((formInfo) => ({
                          ...formInfo,
                          admin_ra: e.target.value,
                        }))
                      : setFormInfo((formInfo) => ({
                          ...formInfo,
                          admin_ra: null,
                        }))
                  }
                  variant="outlined"
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  fullWidth
                />

                <Typography variant="body1" className="form-field-title">
                  Other Source (optional)
                </Typography>
                <TextField
                  value={formInfo.admin_other_source}
                  onChange={(e) =>
                    e.target.value
                      ? setFormInfo((formInfo) => ({
                          ...formInfo,
                          admin_other_source: e.target.value,
                        }))
                      : setFormInfo((formInfo) => ({
                          ...formInfo,
                          admin_other_source: null,
                        }))
                  }
                  variant="outlined"
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  fullWidth
                />

                <Typography variant="body1" className="form-field-title">
                  Total
                </Typography>
                <Typography variant="body1">
                  $
                  {+formInfo.admin_utf +
                    +formInfo.admin_departmental_award +
                    +formInfo.admin_ta +
                    +formInfo.admin_ra +
                    +formInfo.admin_other_source}
                </Typography>
              </>
            ) : null}
            <Typography variant="body1" className="form-field-title">
              Payment Notes (optional)
            </Typography>
            <TextField
              value={formInfo.admin_payment_notes}
              onChange={(e) =>
                e.target.value
                  ? setFormInfo((formInfo) => ({
                      ...formInfo,
                      admin_payment_notes: e.target.value,
                    }))
                  : setFormInfo((formInfo) => ({
                      ...formInfo,
                      admin_payment_notes: null,
                    }))
              }
              variant="outlined"
              fullWidth
              multiline
              rows={5}
              rowsMax={10}
            />
            <Typography variant="body1" className="form-field-title">
              Supplemental Award Letter Notes (optional)
            </Typography>
            <TextField
              value={formInfo.admin_award_letter_notes}
              onChange={(e) =>
                e.target.value
                  ? setFormInfo((formInfo) => ({
                      ...formInfo,
                      admin_award_letter_notes: e.target.value,
                    }))
                  : setFormInfo((formInfo) => ({
                      ...formInfo,
                      admin_award_letter_notes: null,
                    }))
              }
              variant="outlined"
              fullWidth
              multiline
              rows={5}
              rowsMax={10}
            />
            <Checkbox
              checked={confirm}
              onChange={(e) => {
                setConfirm(e.target.checked);
              }}
              color="primary"
            />
            <Typography
              style={{ marginLeft: 50, marginTop: -35, color: "grey" }}
              variant="body2"
            >
              I confirm that above info is correct and Lorem ipsum dolor sit
              amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt
              ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat.
            </Typography>
            <Typography variant="caption" color="error">
              {!confirm && submitCheck ? "Required field" : null}
            </Typography>
          </div>
        );
      case 1:
        return (
          <div>
            <Alert severity="info">
              <AlertTitle style={{ fontWeight: 800 }}>
                You are almost done.
              </AlertTitle>
              Please review the information below to ensure it is accurate, then
              click <strong>Submit</strong> at the bottom of the page.
            </Alert>
            <Typography
              gutterBottom
              variant="body1"
              className="form-field-title"
            >
              First Name
            </Typography>
            <Typography gutterBottom variant="body1">
              {formInfo.first_name}
            </Typography>
            <Typography
              gutterBottom
              variant="body1"
              className="form-field-title"
            >
              Last Name
            </Typography>
            <Typography gutterBottom variant="body1">
              {formInfo.last_name}
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
              {formInfo.email}
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

            {formInfo.award == "Connaught" || formInfo.award == "Trillium" ? (
              <>
                <Typography
                  gutterBottom
                  variant="body1"
                  className="form-field-title"
                >
                  Type of payment requested (required)
                </Typography>
                <Typography variant="body1">
                  {formInfo.type_payment_request}
                </Typography>
              </>
            ) : null}
            <Typography
              gutterBottom
              variant="body1"
              className="form-field-title"
            >
              Requested start date (required)
            </Typography>
            <Typography variant="body1">
              {" "}
              {formInfo.award_start_session}
            </Typography>
            <Typography variant="body1" className="form-field-title">
              Additional Documentation
            </Typography>
            {formInfo?.documents?.map((document) => (
              <Typography variant="subtitle2">
                <Link
                  style={{ cursor: "pointer" }}
                  underline="hover"
                  onClick={() => {
                    handleFileDownload(document);
                  }}
                >
                  {document.name}
                </Link>
              </Typography>
            ))}

            <Typography
              gutterBottom
              variant="body1"
              className="form-field-title"
            >
              Submitted: {convertDate(formInfo.submitted_at)}
            </Typography>
            <hr />
            <Typography className="form-field-title" gutterBottom variant="h6">
              Administration Information
            </Typography>
            <hr />
            {formInfo?.award_duration == "CGS M (12 months)" ? (
              <>
                <Typography variant="body1" className="form-field-title">
                  Indicate the nature of the research requirement(s) of the
                  awardee's program (required)
                </Typography>
                <FormControl disabled component="fieldset">
                  <RadioGroup
                    value={formInfo?.admin_research_requirement}
                    onChange={(e) =>
                      e.target.value
                        ? setFormInfo((formInfo) => ({
                            ...formInfo,
                            admin_research_requirement: e.target.value,
                          }))
                        : setFormInfo((formInfo) => ({
                            ...formInfo,
                            admin_research_requirement: null,
                          }))
                    }
                    aria-label="start-date"
                    name="customized-radios"
                  >
                    <FormControlLabel
                      control={<Radio color="primary" />}
                      value="Thesis"
                      label="Thesis"
                    />
                    <FormControlLabel
                      control={<Radio color="primary" />}
                      value="Major Research Project/Paper"
                      label="Major Research Project/Paper"
                    />
                    <FormControlLabel
                      control={<Radio color="primary" />}
                      value="Other (specify)"
                      label="Other (specify)"
                    />
                    <Typography variant="caption" color="error">
                      {!formInfo.admin_research_requirement && submitCheck
                        ? "Required field"
                        : null}
                    </Typography>
                  </RadioGroup>
                </FormControl>
              </>
            ) : null}

            {formInfo?.award == "OGS" ? (
              <>
                <Typography variant="body1" className="form-field-title">
                  Matching portion will be paid from (required)
                </Typography>
                <FormControl disabled component="fieldset">
                  <RadioGroup
                    value={formInfo?.admin_matching_portion}
                    onChange={(e) =>
                      e.target.value
                        ? setFormInfo((formInfo) => ({
                            ...formInfo,
                            admin_matching_portion: e.target.value,
                          }))
                        : setFormInfo((formInfo) => ({
                            ...formInfo,
                            admin_matching_portion: null,
                          }))
                    }
                    aria-label="start-date"
                    name="customized-radios"
                  >
                    <FormControlLabel
                      control={<Radio color="primary" />}
                      value="Non-RA Department resource (eg UTF or named OGS"
                      label="Non-RA Department resource (eg UTF or named OGS"
                    />
                    <FormControlLabel
                      control={<Radio color="primary" />}
                      value="Research assistantship through payroll"
                      label="Research assistantship through payroll"
                    />
                    <Typography variant="caption" color="error">
                      {!formInfo.admin_matching_portion && submitCheck
                        ? "Required field"
                        : null}
                    </Typography>
                  </RadioGroup>
                </FormControl>
              </>
            ) : null}
            {formInfo?.award == "Connaught" || formInfo?.award == "Trillium" ? (
              <>
                <Typography variant="body1" className="form-field-title">
                  UTF (required)
                </Typography>
                <TextField
                  disabled
                  value={formInfo.admin_utf}
                  error={!formInfo.admin_utf && submitCheck}
                  helperText={
                    !formInfo.admin_utf && submitCheck ? "Required field" : null
                  }
                  onChange={(e) =>
                    e.target.value
                      ? setFormInfo((formInfo) => ({
                          ...formInfo,
                          admin_utf: e.target.value,
                        }))
                      : setFormInfo((formInfo) => ({
                          ...formInfo,
                          admin_utf: null,
                        }))
                  }
                  variant="outlined"
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  fullWidth
                />

                <Typography variant="body1" className="form-field-title">
                  Departmental/Endowment (required)
                </Typography>
                <TextField
                  disabled
                  value={formInfo.admin_departmental_award}
                  error={!formInfo.admin_departmental_award && submitCheck}
                  helperText={
                    !formInfo.admin_departmental_award && submitCheck
                      ? "Required field"
                      : null
                  }
                  onChange={(e) =>
                    e.target.value
                      ? setFormInfo((formInfo) => ({
                          ...formInfo,
                          admin_departmental_award: e.target.value,
                        }))
                      : setFormInfo((formInfo) => ({
                          ...formInfo,
                          admin_departmental_award: null,
                        }))
                  }
                  variant="outlined"
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  fullWidth
                />

                <Typography variant="body1" className="form-field-title">
                  Teaching Assistantship (required)
                </Typography>
                <TextField
                  disabled
                  value={formInfo.admin_ta}
                  error={!formInfo.admin_ta && submitCheck}
                  helperText={
                    !formInfo.admin_ta && submitCheck ? "Required field" : null
                  }
                  onChange={(e) =>
                    e.target.value
                      ? setFormInfo((formInfo) => ({
                          ...formInfo,
                          admin_ta: e.target.value,
                        }))
                      : setFormInfo((formInfo) => ({
                          ...formInfo,
                          admin_ta: null,
                        }))
                  }
                  variant="outlined"
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  fullWidth
                />

                <Typography variant="body1" className="form-field-title">
                  Research Assistantship (required)
                </Typography>
                <TextField
                  disabled
                  value={formInfo.admin_ra}
                  error={!formInfo.admin_ra && submitCheck}
                  helperText={
                    !formInfo.admin_ra && submitCheck ? "Required field" : null
                  }
                  onChange={(e) =>
                    e.target.value
                      ? setFormInfo((formInfo) => ({
                          ...formInfo,
                          admin_ra: e.target.value,
                        }))
                      : setFormInfo((formInfo) => ({
                          ...formInfo,
                          admin_ra: null,
                        }))
                  }
                  variant="outlined"
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  fullWidth
                />

                <Typography variant="body1" className="form-field-title">
                  Other Source (optional)
                </Typography>
                <TextField
                  disabled
                  value={formInfo.admin_other_source}
                  onChange={(e) =>
                    e.target.value
                      ? setFormInfo((formInfo) => ({
                          ...formInfo,
                          admin_other_source: e.target.value,
                        }))
                      : setFormInfo((formInfo) => ({
                          ...formInfo,
                          admin_other_source: null,
                        }))
                  }
                  variant="outlined"
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  fullWidth
                />

                <Typography variant="body1" className="form-field-title">
                  Total
                </Typography>
                <Typography variant="body1">
                  $
                  {+formInfo.admin_utf +
                    +formInfo.admin_departmental_award +
                    +formInfo.admin_ta +
                    +formInfo.admin_ra +
                    +formInfo.admin_other_source}
                </Typography>
              </>
            ) : null}
            <Typography variant="body1" className="form-field-title">
              Payment Notes (optional)
            </Typography>
            <TextField
              disabled
              value={formInfo.admin_payment_notes}
              variant="outlined"
              fullWidth
              multiline
              rows={5}
              rowsMax={10}
            />
                        <Typography variant="body1" className="form-field-title">
              Supplemental Award Letter Notes (optional)
            </Typography>
            <TextField
              disabled
              value={formInfo.admin_award_letter_notes}
              variant="outlined"
              fullWidth
              multiline
              rows={5}
              rowsMax={10}
            />
            <Checkbox
              disabled
              checked={confirm}
              onChange={(e) => {
                setConfirm(e.target.checked);
              }}
              color="primary"
            />
            <Typography
              style={{ marginLeft: 50, marginTop: -35, color: "grey" }}
              variant="body2"
            >
              I confirm that above info is correct and Lorem ipsum dolor sit
              amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt
              ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat.
            </Typography>
            <Typography variant="caption" color="error">
              {!confirm && submitCheck ? "Required field" : null}
            </Typography>
          </div>
        );
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
        <Typography className="form-field-title" gutterBottom variant="h6">
          Payment Activation Form
        </Typography>
        <Typography gutterBottom variant="body2">
          This form is used to activate payment.
        </Typography>
        <hr />
        <Typography className="form-field-title" gutterBottom variant="h6">
          User Information
        </Typography>
        <hr />
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
              {activeStep === steps.length - 1 ? null : (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleSave()}
                >
                  {" "}
                  Save
                </Button>
              )}
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  disabled={submit}
                >
                  {" "}
                  Submit
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  {" "}
                  Next
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      <Dialog aria-labelledby="simple-dialog-title" maxWidth= 'xs' open={submit}>
      <DialogTitle id="simple-dialog-title" style = {{textAlign:'center', paddingTop: 40}}>Generating Award Letter</DialogTitle>
      <div className="container" style = {{padding: "40px"}}>
<div className="row">
<div className = "col-12 text-center">
<LinearProgress color='primary'/>
    </div>
    </div>
    <div className="row">
  <div className = "col-12 text-center">
    <Typography variant = "subtitle1">
    This may take up to 60 seconds. Please wait...
</Typography>
</div>
</div>
    </div>
    </Dialog>
    </div>

    
  );
}