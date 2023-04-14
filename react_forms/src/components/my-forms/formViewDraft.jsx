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
  Link,
  IconButton
} from "@material-ui/core";
import {Alert, AlertTitle} from '@material-ui/lab'
import DeleteIcon from "@material-ui/icons/Delete";
import NavBar from "../app/NavBar";
import { Context, withContext } from "../app/context";
import { useHistory, useParams } from "react-router-dom";
import ROUTE from "../app/route";
import axios from 'axios';
import axiosInstance from '../app/api';
import { departmentsObject } from "../new-forms/departments";




export default function FormViewDraft({retrievedFormInfo}) {  

    const [activeStep, setActiveStep] = useState(0);

    const [complete, setComplete] = useState();
    const [loaded, setLoaded] = useState();
    const [submitCheck, setSubmitCheck] = useState();
    const [submit, setSubmit] = useState(false);
    const [confirm, setConfirm] = useState();
    const [error, setError] = useState();
    const [formInfo, setFormInfo] = useState(retrievedFormInfo);
    const [departmentList, setDepartmentList] = useState([]);
    const [programList, setProgramList] = useState([]);
    const [documents, setDocuments] = useState([]);

  
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
      handleFileDownload
    } = useContext(Context);
  
    useEffect(()=> {
      if (!loaded){
      if (formInfo.faculty) 
      {getDepartments(formInfo.faculty)}
      if (formInfo.graduate_unit) 
      {getPrograms(formInfo.graduate_unit)}
      setLoaded(true)
      }
    })
    const getPaymentActivationForm = () => {
      axiosInstance
      .get(
        '/api/payment-activation/'
      )
      .then(response => {
        console.log(response)
    })
      .catch(error => {setError(error.response.status)
      console.log(error.response)})
    }
  
  
    const editPaymentActivationForm = (data, redirect) => {

        const formData = new FormData();
    
        Object.entries(data).forEach(([name, value]) => {
          formData.append(name, value);
        });
    
        for (let i = 0; i < documents.length; i++) {
          formData.append("documents", documents[i]);
        }
    
        console.log(formData);
    
        axiosInstance
          .patch("/api/payment-activation/", formData)
          .then(response => { setFormInfo(response.data)
            if (redirect){history.push(redirect)}
          })
          .catch((error) => {
            setError(error.response.status);
            console.log(error.response);
          });
      };

  
    const handleFileDelete = (document_info) => {
      const downloadUrl = `/api/download/${document_info.id}/`;
      axiosInstance
      .delete(downloadUrl)
      .then((response) => {
        console.log(response)
        getPaymentActivationForm()
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFileChange = (e) => {
    const newDocument = e.target.files[0];
    console.log(newDocument)
    setDocuments((documents) => [...documents, newDocument]);
  };

  const handleNewFileDelete = (name) => {
    console.log(name);
    setDocuments(documents.filter((item) => item.name !== name));
    console.log(documents);
  };

  
  const getDepartments = (e) => {
    setFormInfo(formInfo=> ({...formInfo, faculty: e}))
        setDepartmentList([])
        for (let i = 0; i < departmentsObject.length; i++){
          if (departmentsObject[i].faculty == e) {  
            for (let j = 0; j < departmentsObject[i]['departments'].length; j++) {
  setDepartmentList(departmentList => [...departmentList, departmentsObject[i]['departments'][j].department])
            }}
    }
  }
  
  const getPrograms = (e) => {
    setFormInfo(formInfo=> ({...formInfo, graduate_unit: e}))
        setProgramList([])
        for (let i = 0; i < departmentsObject.length; i++){
          if (departmentsObject[i].faculty == formInfo.faculty) {  
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
        !formInfo.student_number ||
        !formInfo.faculty ||
        !formInfo.graduate_unit ||
        !formInfo.program ||
        !formInfo.degree_start_date ||
        !formInfo.award ||
        !formInfo.award_duration ||
        !formInfo.award_start_session ||
        !confirm
      ) {
        setComplete(false);
      }
      else if (formInfo.award == 'Connaught' && !formInfo.type_payment_request || formInfo.award == 'Trillium' && !formInfo.type_payment_request){
        setComplete(false);
      }
      else {
        setComplete(true);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        handleFormUpdate()
      }
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
  
    const handleSubmit = () => {
      setSubmit(true)
      editPaymentActivationForm({
        confirmation_number: formInfo.confirmation_number,
        submitted: true,
        submitted_at: new Date().toISOString()},
        ROUTE.MY_FORMS)
        setUserInfo();
      ;
  
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
                value={formInfo.student_number}
                error={!formInfo.student_number && submitCheck}
                helperText={!formInfo.student_number && submitCheck ? "Required field" : null}
                onChange={(e) =>
                  e.target.value
                    ? setFormInfo(formInfo=> ({...formInfo, student_number: e.target.value}))
                    : setFormInfo(formInfo=> ({...formInfo, student_number: null}))

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
                  error={!formInfo.faculty && submitCheck}
                  onChange={(e) =>
                    e.target.value
                      ? getDepartments(e.target.value)
                      : setFormInfo(formInfo=> ({...formInfo, faculty: null}))
                  }
                  native
                  value={formInfo.faculty}
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
                    {!formInfo.faculty && submitCheck ? "Required field" : null}
                  </Typography>
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
                  error={!formInfo.graduate_unit && submitCheck}
                  onChange={(e) =>
                    e.target.value
                      ? getPrograms(e.target.value)
                      : setFormInfo(formInfo=> ({...formInfo, graduate_unit: null}))
                  }
                  native
                  value={formInfo.graduate_unit}
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
                    {!formInfo.graduate_unit && submitCheck ? "Required field" : null}
                  </Typography>
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
                  error={!formInfo.program && submitCheck}
                  onChange={(e) =>
                    e.target.value
                      ? setFormInfo(formInfo=> ({...formInfo, program: e.target.value}))
                      : setFormInfo(formInfo=> ({...formInfo, program: null}))
                  }
                  native
                  value={formInfo.program}
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
                    {!formInfo.program && submitCheck ? "Required field" : null}
                  </Typography>
              </FormControl>
              <Typography
                gutterBottom
                variant="body1"
                className="form-field-title"
              >
                Start date of degree program (required)
              </Typography>
              <TextField
                value={formInfo.degree_start_date}
                error={!formInfo.degree_start_date && submitCheck}
                helperText={!formInfo.degree_start_date && submitCheck ? "Required field" : null}
                onChange={(e) =>
                  e.target.value
                    ? setFormInfo(formInfo=> ({...formInfo, degree_start_date: e.target.value}))
                    : setFormInfo(formInfo=> ({...formInfo, degree_start_date: null}))
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
                  value={formInfo.award}
                  onChange={(e) =>
                    e.target.value ? 
                    setFormInfo(formInfo=> ({...formInfo, award: e.target.value})) : 
                    setFormInfo(formInfo=> ({...formInfo, award: null}))
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
                    {!formInfo.award && submitCheck ? "Required field" : null}
                  </Typography>
                </RadioGroup>
              </FormControl>
              {formInfo.award?<>
              <Typography
                gutterBottom
                variant="body1"
                className="form-field-title"
              >
                Please indicate the duration (required)
              </Typography>
  
              <FormControl component="fieldset">
                <RadioGroup
                  value={formInfo.award_duration}
                  onChange={(e) =>
                    e.target.value
                      ? setFormInfo(formInfo=> ({...formInfo, award_duration: e.target.value}))
                      : setFormInfo(formInfo=> ({...formInfo, award_duration: null}))
                  }
                  aria-label="duration"
                  name="customized-radios"
                >
  {renderSwitch(formInfo.award)}
                  <Typography variant="caption" color="error">
                    {!formInfo.award_duration && submitCheck ? "Required field" : null}
                  </Typography>
                </RadioGroup>
              </FormControl>
              </>
              :null}
              {formInfo.award == 'Connaught' || formInfo.award == 'Trillium'?
              <><Typography
                gutterBottom
                variant="body1"
                className="form-field-title"
              >
                Type of payment requested (required)
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  value={formInfo.type_payment_request}
                  onChange={(e) =>
                    e.target.value
                      ? setFormInfo(formInfo=> ({...formInfo, type_payment_request: e.target.value}))
                      : setFormInfo(formInfo=> ({...formInfo, type_payment_request: null}))
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
                    {!formInfo.type_payment_request && submitCheck ? "Required field" : null}
                  </Typography>
                </RadioGroup>
              </FormControl></>
              :null}
              <Typography
                gutterBottom
                variant="body1"
                className="form-field-title"
              >
                Requested start date (required)
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  value={formInfo.award_start_session}
                  onChange={(e) =>
                    e.target.value
                      ? setFormInfo(formInfo=> ({...formInfo, award_start_session: e.target.value}))
                      : setFormInfo(formInfo=> ({...formInfo, award_start_session: null}))
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
                    {!formInfo.award_start_session && submitCheck ? "Required field" : null}
                  </Typography>
                </RadioGroup>
              </FormControl>

              <Typography variant="body1" className="form-field-title">
              Additional Documentation
            </Typography>
            {formInfo?.documents?.map((document) => (
              <div>
                  <IconButton
                  aria-label="delete"
                  style={{
                    padding: 0,
                    margin: "0px 10px 5px 0px",
                    verticalAlign: "middle",
                  }}
                  onClick={() => {
                    handleFileDelete(document)
                  }}
                >
                  <DeleteIcon />
                </IconButton>
                <Typography variant="subtitle2" style={{ display: "inline" }}><Link style = {{cursor:'pointer'}}underline = 'hover' onClick={() => {(handleFileDownload(document))}}>{document.name}</Link></Typography></div>
            ))}

{documents?.map((document) => (
              <div>
                  <IconButton
                  aria-label="delete"
                  style={{
                    padding: 0,
                    margin: "0px 10px 5px 0px",
                    verticalAlign: "middle",
                  }}
                  onClick={() => {
                   handleNewFileDelete(document.name)
                  }}
                >
                  <DeleteIcon />
                </IconButton>
                <Typography variant="subtitle2" style={{ display: "inline" }}>
                  {document.name}
                </Typography>
                </div>))}

<div>
              <input
                accept="image/*"
                id="contained-button-file"
                type="file"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span">
                  Upload
                </Button>
              </label>
            </div>

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
            <Alert severity="info">
    <AlertTitle style = {{fontWeight: 800}}>You are almost done.</AlertTitle>
    Please review the information below to ensure it is accurate, then click <strong>Submit</strong> at the bottom of the page.
  </Alert>
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
                Please identify the funding agency (required)
              </Typography>
              <FormControl disabled component="fieldset">
                <RadioGroup
                
                  value={formInfo.award}
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
                    {!formInfo.award && submitCheck ? "Required field" : null}
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
                  value={formInfo.award_duration}
                  aria-label="duration"
                  name="customized-radios"
                >
  {renderSwitch(formInfo.award)}
  
                  <Typography variant="caption" color="error">
                    {!formInfo.award_duration && submitCheck ? "Required field" : null}
                  </Typography>
                </RadioGroup>
              </FormControl>
              {formInfo.award == 'Connaught' || formInfo.award == 'Trillium'?
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
                  value={formInfo.type_payment_request}
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
                    {!formInfo.type_payment_request && submitCheck ? "Required field" : null}
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
                  value={formInfo.award_start_session}
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
                    {!formInfo.award_start_session && submitCheck ? "Required field" : null}
                  </Typography>
                </RadioGroup>
              </FormControl>

              <Typography variant="body1" className="form-field-title">
              Additional Documentation
            </Typography>
            {formInfo?.documents?.map((document) => (
              <Typography variant="subtitle2">{document.name}</Typography>
            ))}

{documents?.map((document) => (
              <div>
                <Typography variant="subtitle2" style={{ display: "inline" }}>
                  {document.name}
                </Typography>
                </div>))}
            
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
            </div>
    );
  }
  