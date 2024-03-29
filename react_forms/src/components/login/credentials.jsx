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
import LinearProgress from '@material-ui/core/LinearProgress';
import { Context, withContext } from "../app/context";
import { useHistory, Link as Links } from "react-router-dom";
import ROUTE from "../app/route";
import axios from "axios";
import axiosInstance from "../app/api";
import { useGoogleLogin } from "@react-oauth/google";
import googleLogo from "./google-icon.png";
import microsoftLogo from "./microsoft-icon.png";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "./authConfig";

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
    isMicrosoftLogged,
    setIsMicrosoftLogged,
    microsoftAccessToken,
    setMicrosoftAccessToken,
  } = useContext(Context);
  const history = useHistory();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const [loggingIn, setLoggingIn] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    setLoggingIn(true);
    axiosInstance
      .post("/users/token/obtain/", { username: username, password: password })
      .then((response) => {
        setAccessToken(response.data.access);
        axiosInstance.defaults.headers["Authorization"] =
          "JWT " + response.data.access;
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);

        setAuthentication(true);
        setLoggingIn(false);
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

  // Google Login

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => getGoogleProfileInfo(tokenResponse),
  });

  const getGoogleProfileInfo = (e) => {
    axiosInstance
      .post("/users/google-profile/", { access_token: e["access_token"] })
      .then((response) => {
        submitExternalProfile(
          response.data["emailAddresses"][0]["value"],
          response.data["names"][0]["metadata"]["source"]["id"],
          "google",
          response.data["names"][0]["givenName"],
          response.data["names"][0]["familyName"]
        );
      })
      .catch((error) => {
        setError(error.response.status);
      });
  };

  // Microsoft Login

  const { instance } = useMsal();

  const getName = (fullName) => {
    const nameArray = fullName.split(" ");
    const surname = nameArray.pop();
    const givenName = nameArray.join(" ");
    return { givenName: givenName, surname: surname };
  };

  const handleMicrosoftLogin = (loginType) => {
    if (loginType === "popup") {
      instance
        .loginPopup(loginRequest)
        .then((response) => {
          submitExternalProfile(
            response.account.username,
            response.account.localAccountId,
            "microsoft",
            getName(response.account.name).givenName,
            getName(response.account.name).surname
          );
          setMicrosoftAccessToken(response.accessToken);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const submitExternalProfile = (
    email,
    external_id,
    external_type,
    first_name,
    last_name
  ) => {
    setLoggingIn(true);
    axiosInstance
      .post("/users/external-login/", {
        email: email,
        external_id: external_id,
        external_type: external_type,
        first_name: first_name,
        last_name: last_name,
      })
      .then((response) => {
        setAccessToken(response.data.access);
        axiosInstance.defaults.headers["Authorization"] =
          "JWT " + response.data.access;
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);

        if (external_type == "microsoft") {
          setIsMicrosoftLogged(true);
        } else if (external_type == "google") {
          setIsGoogleLogged(true);
        }
        setAuthentication(true);
        setLoggingIn(false);
        history.push(ROUTE.MY_FORMS);
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

{loggingIn & !error ?

<CardContent  style = {{padding: "50px"}}>
<Typography variant = "h6" component = "h2">
Signing in... please wait
</Typography>
<LinearProgress  style = {{margin: "20px 0px 0px 0px"}}/>

</CardContent> :
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
            onClick={() => handleMicrosoftLogin("popup")}
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
              src={microsoftLogo}
              style={{
                width: 20,
                marginRight: 10,
                verticalAlign: "middle",
              }}
            />
            <Typography variant="body1" component="h5">
              Continue with Microsoft Account
            </Typography>
          </Button>

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
      }
    </Card>
  );
}
