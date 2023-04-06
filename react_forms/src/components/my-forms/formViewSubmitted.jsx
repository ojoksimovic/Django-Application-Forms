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
  Link
} from "@material-ui/core";
import {Alert, AlertTitle} from '@material-ui/lab'
import NavBar from "../app/NavBar";
import { Context, withContext } from "../app/context";
import { useHistory, useParams } from "react-router-dom";
import ROUTE from "../app/route";
import axios from 'axios';
import axiosInstance from '../app/api';


export default function FormViewSubmitted({formInfo}) {  

    const {userInfo, convertDate, handleFileDownload} = useContext(Context);

    const getPaymentActivationForm = () => {
      axiosInstance
      .get(
        '/api/payment-activation/'
      )
      .then(response => {
    })
      .catch(error => {
      console.log(error.response)})
    }
  

    const renderSwitch = (award) => {
        switch(formInfo.award){
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

    return(

<div>
                    <Typography className="form-field-title" gutterBottom variant = 'h5'>Payment Activation Form</Typography>
              <Typography gutterBottom variant = 'body2'>This form is used to activate payment.</Typography>
              <hr />
           <Typography
              gutterBottom
              variant="body1"
              className="form-field-title"
            >
              First Name
            </Typography>
            <Typography gutterBottom variant="body1">
              {formInfo?.first_name}
            </Typography>
            <Typography
              gutterBottom
              variant="body1"
              className="form-field-title"
            >
              Last Name
            </Typography>
            <Typography gutterBottom variant="body1">
              {formInfo?.last_name}
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
              {formInfo?.email}
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
              {formInfo?.graduate_unit}
            </Typography>
            <Typography
              gutterBottom
              variant="body1"
              className="form-field-title"
            >
              Degree Program
            </Typography>
            <Typography gutterBottom variant="body1">
              {formInfo?.program}
            </Typography>
            <Typography
              gutterBottom
              variant="body1"
              className="form-field-title"
            >
              Start date of degree program
            </Typography>
            <Typography gutterBottom variant="body1">
              {formInfo?.degree_start_date}
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
              
                value={formInfo?.award}
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
                value={formInfo?.award_duration}

                aria-label="duration"
                name="customized-radios"
              >
{renderSwitch(formInfo?.award)}

                <Typography variant="caption" color="error">
                </Typography>
              </RadioGroup>
            </FormControl>
            {formInfo?.award == 'Connaught' || formInfo?.award == 'Trillium'?
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
                value={formInfo?.type_payment_request}
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
                value={formInfo?.award_start_session}
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
                </Typography>
              </RadioGroup>
            </FormControl>

            <Typography variant="body1" className="form-field-title">
              Additional Documentation
            </Typography>
            {formInfo?.documents?.map((document) => (
              <Typography variant="subtitle2"><Link style = {{cursor:'pointer'}}underline = 'hover' onClick={() => {(handleFileDownload(document))}}>{document.name}</Link></Typography>
            ))}

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
                checked={formInfo?.submitted}
                color="primary"
              />
              I confirm that above
            </Typography>
            <Typography variant="caption" color="error">
            </Typography>
            <Typography
              gutterBottom
              variant="body1"
              className="form-field-title"
            >
              Submitted: {convertDate(formInfo.submitted_at)}
            </Typography>
        </div>
    )
}