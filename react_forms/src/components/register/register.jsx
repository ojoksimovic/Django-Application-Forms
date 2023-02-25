import React, { useState, useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import {
  CircularProgress,
  Card,
  TextField,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";
import { Context, withContext } from "../app/context";
import { useHistory } from "react-router-dom";
import "../app/style.css";
import ROUTE from "../app/route";
import axios from "axios";

export default function Register() {
  const {
    authentication,
    setAuthentication,
    accessToken,
    setAccessToken,
    refreshToken,
    setrefreshToken,
  } = useContext(Context);
  const history = useHistory();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [first, setFirst] = useState();
  const [last, setLast] = useState();
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [error, setError] = useState();
  const [registered, setRegistered] = useState();

  const onSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        `${ROUTE.HOST}/users/user/create/`,
        {
          email: email,
          username: username,
          password: password,
          first_name: first,
          last_name: last,
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        console.log(response);
        // alert('Successfully registered! Credentials: ' + username + " " + password + " " + email);
        setRegistered(true);
        setTimeout(() => {
          history.push(ROUTE.LOGIN);
        }, 3000);
      })
      .catch((error) => {
        setError(error.response.status);
      });
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleFirstChange = (e) => {
    setFirst(e.target.value);
  };

  const handleLastChange = (e) => {
    setLast(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    e.target.value.length < 8
      ? setPasswordValid(false)
      : setPasswordValid(true);
  };

  const handleEmailChange = (e) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    re.test(e.target.value.toLowerCase())
      ? setEmailValid(true)
      : setEmailValid(false);
    setEmail(e.target.value);
  };

  const handlePasswordReEnter = (e) => {
    e.target.value == password
      ? setPasswordMatch(true)
      : setPasswordMatch(false);
  };

  return (
    <div
      style={{
        minHeight: "100%",
        width: "100%",
        margin: 0,
        display: "flex",
        background:
          "radial-gradient(circle,hsla(0,0%,100%,.3) -52%,#002a5c 66%)",
      }}
    >
      <Card
        style={{
          alignSelf: "center",
          width: "500px",
          textAlign: "center",
          padding: 0,
          margin: "auto",
        }}
      >
        <CardContent
          align="center"
          style={{ padding: 15, backgroundColor: "#002a5c", color: "white" }}
        >
          <Typography variant="h6" component="h1">
            Division of Mock
          </Typography>
        </CardContent>

        {registered ? (
          <CardContent style={{ padding: "30px" }}>
            <Typography variant="h6" component="p" style={{ marginBottom: 20 }}>
              Successfully Registered!
            </Typography>
            <Typography variant="body1">Redirecting to login...</Typography>
            <CircularProgress style={{ marginTop: 10 }} />
          </CardContent>
        ) : (
          <CardContent style={{ padding: "30px" }}>
            <Typography variant="h5" component="p" style={{ marginBottom: 20 }}>
              User Registration
            </Typography>
            <form noValidate onSubmit={onSubmit} autoComplete="off">
              <TextField
                id="first_name"
                label="First Name"
                onChange={(event) => handleFirstChange(event)}
                variant="outlined"
                style={{ margin: "10px 0px", width: "100%" }}
              />
              <TextField
                id="last_name"
                label="Last Name"
                onChange={(event) => handleLastChange(event)}
                variant="outlined"
                style={{ margin: "10px 0px", width: "100%" }}
              />
              <TextField
                id="username"
                label="Username"
                onChange={(event) => handleUsernameChange(event)}
                variant="outlined"
                style={{ margin: "10px 0px", width: "100%" }}
              />
              <TextField
                error={!passwordValid}
                helperText={
                  !passwordValid
                    ? "The password must be at least 8 characters."
                    : ""
                }
                id="password"
                label="Password"
                onChange={(event) => handlePasswordChange(event)}
                variant="outlined"
                type="password"
                style={{ margin: "10px 0px", width: "100%" }}
              />
              <TextField
                error={!passwordMatch}
                helperText={
                  !passwordMatch
                    ? "The password and password confirmation do not match."
                    : ""
                }
                onChange={(event) => handlePasswordReEnter(event)}
                id="password-confirm"
                label="Confirm Password"
                variant="outlined"
                type="password"
                style={{ margin: "10px 0px", width: "100%" }}
              />
              <TextField
                error={!emailValid}
                helperText={!emailValid ? "Please enter a valid email." : ""}
                id="email"
                label="Email"
                onChange={(event) => handleEmailChange(event)}
                variant="outlined"
                type="email"
                style={{ margin: "10px 0px", width: "100%" }}
              />
              <Button
                disabled={
                  first &&
                  last &&
                  password &&
                  username &&
                  email &&
                  emailValid &&
                  passwordMatch
                    ? false
                    : true
                }
                type="submit"
                className="register-button"
                variant="contained"
                align="center"
                style={{
                  textTransform: "none",
                  width: "100%",
                  backgroundColor: "#002a5c",
                  color: "white",
                  marginTop: 20,
                  padding: 15,
                }}
              >
                <Typography variant="body1" component="h5">
                  Register
                </Typography>
              </Button>

              {error == 400 ? (
                <div>
                  <Typography variant="subtitle2" color="error">
                    Response Status: 400 Bad Request
                  </Typography>
                  <Typography variant="subtitle1" color="error">
                    Please enter valid password and/or username
                  </Typography>
                </div>
              ) : null}
              {error == 500 ? (
                <div>
                  <Typography variant="subtitle2" color="error">
                    Response Status: 500 Internal Server Error
                  </Typography>
                  <Typography variant="subtitle1" color="error">
                    Username and/or email already exists.
                  </Typography>
                </div>
              ) : null}
            </form>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
