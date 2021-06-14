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

export default function FormView() {  
  
const history = useHistory();
const { confirmationNumber} = useParams();

  return (
    <div>
<NavBar/>
    <div className = "container-fluid">
    <Paper elevation={3} style = {{padding: 25}}>
      <Typography variant = "h5"> Confirmation Number: {confirmationNumber} </Typography>
     </Paper>
    </div>
    </div>
  );
}