import {
  Button,
  Dialog,
  DialogTitle,
  LinearProgress,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.css";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../app/NavBar";
import axiosInstance from "../app/api";
import { Context } from "../app/context";

export default function AwardLetter() {
  const [formInfo, setFormInfo] = useState();
  const [formView, setFormView] = useState();
  const { userInfo } = useContext(Context);
  const [loaded, setLoaded] = useState();
  const [error, setError] = useState();
  const [submit, setSubmit] = useState();
  const [preSubmit, setPreSubmit] = useState();
  const { confirmationNumber } = useParams();

  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
      getPaymentActivationForm();
    }
  });
  const getPaymentActivationForm = () => {
    axiosInstance
      .get("/api/payment-activation/")
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].confirmation_number == confirmationNumber) {
            setFormInfo(response.data[i]);
            setFormView("applicant");
          } else if (
            response.data[i].admin_confirmation_number == confirmationNumber
          ) {
            setFormInfo(response.data[i]);
            setFormView("administrator");
          }
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  const handleClose = (value) => {
    setPreSubmit(false)
  };

  const getStartedRegeneratedLetters = (e) => {
    setPreSubmit(true)
  }
  const getRegeneratedLetters = () => {
    setPreSubmit(false)
    setSubmit(true);
      axiosInstance
        .patch("/api/payment-activation/", 
        {
          confirmation_number: formInfo.confirmation_number,
          admin_award_letter_notes: formInfo.admin_award_letter_notes,
          admin_submitted: true,
        }, 
        {timeout:30000})
        .then((response) => {
          setFormInfo(response.data);
          setSubmit(false);
          // redirect ? history.push(redirect) : setSaved(true);
          // setTimeout(function () {
          //   window.scrollTo(0, 0);
          // }, 2);
        })
        .catch((error) => {
          setError(error.response.status);
          console.log(error.response);
        });
  };

  return (
    <div>
      <NavBar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2">
            <Paper elevation={3} style={{ padding: 25, marginBottom: 40 }}>
              <div>
                <Typography
                  className="form-field-title"
                  gutterBottom
                  variant="h5"
                >
                  Award Letter
                </Typography>
                <Typography gutterBottom variant="body2">
                  Details listed below.
                </Typography>
                <hr />
                <Typography
                  gutterBottom
                  variant="body1"
                  style={{ whiteSpace: "pre-line" }}
                >
                  {formInfo?.award_letter}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={getStartedRegeneratedLetters}
                  disabled={submit}
                >
                  Regenerate Letter
                </Button>
              </div>
            </Paper>
          </div>
        </div>
      </div>
      {/* First dialog for entering updated award letter comments */}
      <Dialog aria-labelledby="simple-dialog-title" maxWidth="xs" open={preSubmit} onClose={handleClose}>
        <DialogTitle
          id="simple-dialog-title"
          style={{ textAlign: "center", paddingTop: 40 }}
        >
          Regenerating Award Letter
        </DialogTitle>
        <div className="container" style={{ padding: "10px 40px" }}>
          <div className="row">
            <div className="col-12">
            <Typography variant="subtitle1">
                Please review your notes and update if needed. 
              </Typography>
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-center">
            <TextField
            style = {{padding: "20px 0px"}}
              value={formInfo?.admin_award_letter_notes}
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
            />            </div>
          </div>
          <div className = "row">
            <div className = "col-12">
            <Button
             style = {{marginBottom: 20}}
                  variant="contained"
                  color="primary"
                  onClick={getRegeneratedLetters}
                  disabled={submit}
                >
                  Regenerate Letter
                </Button>
            </div>
          </div>
        </div>
      </Dialog>
      {/* Dialog for final submission */}
      <Dialog aria-labelledby="simple-dialog-title" maxWidth="xs" open={submit}>
        <DialogTitle
          id="simple-dialog-title"
          style={{ textAlign: "center", paddingTop: 40 }}
        >
          Regenerating Award Letter
        </DialogTitle>
        <div className="container" style={{ padding: "40px" }}>
          <div className="row">
            <div className="col-12 text-center">
              <LinearProgress color="primary" />
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-center">
              <Typography variant="subtitle1">
                This may take up to 30 seconds. Please wait...
              </Typography>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
