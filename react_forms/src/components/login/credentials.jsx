import React, { useState, useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import {
  Card,
  Link,
  TextField,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";
import { Context, withContext } from "../app/context";
import { useHistory, Link as Links } from "react-router-dom";
import ROUTE from "../app/route";
import axios from "axios";
import axiosInstance from "../app/api";
import { useGoogleLogin } from "@react-oauth/google";
import googleLogo from "./google-icon.png";

export default function Credentials() {
  const {
    authentication,
    setAuthentication,
    accessToken,
    setAccessToken,
    refreshToken,
    setrefreshToken,
    isGoogleLogged,
    setIsGoogleLogged,
  } = useContext(Context);
  const history = useHistory();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const onSubmit = (event) => {
    event.preventDefault();
    axiosInstance
      .post("/users/token/obtain/", { username: username, password: password })
      .then((response) => {
        setAccessToken(response.data.access);
        axiosInstance.defaults.headers["Authorization"] =
          "JWT " + response.data.access;
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);

        setAuthentication(true);
        history.push(ROUTE.MY_FORMS);
      })
      .catch((error) => {
        setError(error.response.status);
      });
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const login = useGoogleLogin({
    onSuccess:
      (tokenResponse) => getProfileInfo(tokenResponse) 
      & console.log(tokenResponse)
      & setIsGoogleLogged(true),
    prompt: "consent",
    ux_mode: "redirect",
    // on success:
    // 2. update front end by adding state for Google Sign ins (may need to add internal access tokens), and forward user to main page.
    // 1. send access_token to backend
    // check if email exists
    // if not, create user by accessing Google's People API (https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses)
    // create column in django for Google ID

    // add log out function to check if google logged
  });

  const getProfileInfo = (e) => {

  axiosInstance
      .post("/users/google-profile/", { access_token: e['access_token']})
      .then((response) => {
        console.log(response);
        submitGoogleProfile(response.data)
        // setAccessToken(response.data.access);
        // axiosInstance.defaults.headers["Authorization"] =
        //   "JWT " + response.data.access;
        // localStorage.setItem("access_token", response.data.access);
        // localStorage.setItem("refresh_token", response.data.refresh);

        // setAuthentication(true);
        // history.push(ROUTE.MY_FORMS);
      })
      .catch((error) => {
        setError(error.response.status);
      });

};  

const submitGoogleProfile = (e) => {
console.log(e)
  axiosInstance
      .post("/users/google-login/", { email: e['emailAddresses'][0]['value'], external_id: e['data']['names'][0]['metadata']['source']['id']})
      .then((response) => {
        console.log(response);
        // setAccessToken(response.data.access);
        // axiosInstance.defaults.headers["Authorization"] =
        //   "JWT " + response.data.access;
        // localStorage.setItem("access_token", response.data.access);
        // localStorage.setItem("refresh_token", response.data.refresh);

        // setAuthentication(true);
        // history.push(ROUTE.MY_FORMS);
      })
      .catch((error) => {
        setError(error.response.status);
      });

};  

return (
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

      <CardContent style={{ padding: "50px" }}>
        <Typography variant="h6" component="p" style={{ marginBottom: 20 }}>
          Please enter your credentials.
        </Typography>

        <form noValidate onSubmit={onSubmit} autoComplete="off">
          <TextField
            id="username"
            label="Username"
            onChange={(event) => handleUsernameChange(event)}
            variant="outlined"
            style={{ margin: 10, width: "100%" }}
          />
          <TextField
            id="password"
            label="Password"
            onChange={(event) => handlePasswordChange(event)}
            variant="outlined"
            type="password"
            style={{ margin: 10, width: "100%" }}
          />
          <Button
            type="submit"
            className="login-button"
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
              Login
            </Typography>
          </Button>
          <Link href={ROUTE.REGISTER} variant="subtitle2" color="inherit">
            Don't have an account? Register here.
          </Link>
          <div
            class="row align-items-center"
            style={{
              marginTop: 15,
            }}
          >
            <div class="col">
              <hr />
            </div>
            <div class="col-auto">
              <Typography variant="subtitle2" color="inherit">
                OR
              </Typography>
            </div>
            <div class="col">
              <hr />
            </div>
          </div>

          <Button
            onClick={() => login()}
            className="login-button"
            variant="contained"
            align="center"
            style={{
              textTransform: "none",
              width: "100%",
              backgroundColor: "#337AB7",
              color: "white",
              marginTop: 20,
              padding: 15,
            }}
          >
            <img
              src={googleLogo}
              style={{
                width: 20,
                marginRight: 10,
                verticalAlign: "middle",
              }}
            />
            <Typography variant="body1" component="h5">
              Continue with Google
            </Typography>
          </Button>

          {authentication ? (
            <Typography variant="body1">authenticated!</Typography>
          ) : null}

          {error == 400 ? (
            <div>
              <Typography variant="subtitle2" color="error">
                Response Status: 400 Bad Request
              </Typography>
              <Typography variant="subtitle1" color="error">
                Please enter credentials
              </Typography>
            </div>
          ) : null}
          {error == 401 ? (
            <div>
              <Typography variant="subtitle2" color="error">
                Response Status: 401 Forbidden
              </Typography>
              <Typography variant="subtitle1" color="error">
                Incorrect username and/or password
              </Typography>
            </div>
          ) : null}
        </form>
      </CardContent>
    </Card>
  );
}
