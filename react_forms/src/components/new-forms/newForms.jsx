import React, { useState, useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import NavBar from '../app/NavBar';
import ROUTE from '../app/route'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Context, withContext } from "../app/context";



export default function NewForms() {
  const {
    setFormInfo,
  } = useContext(Context);
  

  
  // useEffect(() => {
  //   setFormInfo(null)
  // })

  return (
    <div>
    <NavBar/>
    <div className = "container-fluid">
            <Typography variant = "h5"> Available Forms</Typography>
      <div className = "row">

      <div    className = "col-12 col-lg-6 mt-4 mb-4 col-xl-4" >
        <Card className = "card">
          <CardContent>
            <Typography gutterBottom = "true" variant = "h5" className = "form-title">Award Payment Activation Form</Typography>
<Typography variant = "body2">This form is used to activate payment of your award through the School.</Typography>
          </CardContent>
          <CardContent className = "cardfooter">
            <Button variant = "contained" component = {Link} to = {ROUTE.PAYMENT_ACTIVATION} className = "form-button">Start Form +</Button>
          </CardContent>
        </Card>
        </div>

        
      <div className = "col-12 col-lg-6 mt-4 mb-4 col-xl-4">
        <Card className = "card">
          <CardContent>
            <Typography gutterBottom = "true" variant = "h5" className = "form-title">Ontario Graduate Scholarship Application</Typography>
<Typography variant = "body2">Available to those at both the master's and doctoral levels to fund all disciplines of academic study.</Typography>
          </CardContent>
          <CardContent className = "cardfooter">
            <Button disabled variant = "contained" component = {Link} to = {ROUTE.OGS}>Coming soon!</Button>
          </CardContent>
        </Card>
        </div>

        <div className = "col-12 col-lg-6 mt-4 mb-4 col-xl-4">
        <Card className = "card">
          <CardContent>
            <Typography gutterBottom = "true" variant = "h5" className = "form-title">Research Travel Grant Application/Deferral</Typography>
<Typography variant = "body2">The Travel Grant assists those in the Humanities and Social Sciences with research travel that is necessary to the final stages of their program.</Typography>
          </CardContent>
          <CardContent className = "cardfooter">
            <Button disabled variant = "contained" component = {Link} to = {ROUTE.TRAVEL_GRANT} >Coming soon!</Button>
          </CardContent>
        </Card>
        </div>

        <div className = "col-12 col-lg-6 mt-4 mb-4 col-xl-4">
        <Card className = "card">
          <CardContent>
            <Typography gutterBottom = "true" variant = "h5" className = "form-title">Summer Gym Bursary</Typography>
<Typography variant = "body2">This form is used to apply for the Summer Gym Bursary.</Typography>
          </CardContent>
          <CardContent className = "cardfooter">
            <Button disabled variant = "contained" component = {Link} to = {ROUTE.GYM_BURSARY} >Coming soon!</Button>
          </CardContent>
        </Card>
        </div>
</div>
        </div>
    </div>
  );
}
