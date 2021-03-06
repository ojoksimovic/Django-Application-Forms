import React, { useState, useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
} from "@material-ui/core";
import "../app/style.css";
import { createMuiTheme } from "@material-ui/core/styles";
import Credentials from "./credentials";
import ROUTE from "../app/route";
import { useHistory } from "react-router-dom";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#002a5c",
    },
    secondary: {
      main: "#FFFFFF",
    },
  },
});

export default function Logout() {
  const history = useHistory();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      history.push(ROUTE.LOGIN);
    }, 3000);
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 34
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <LinearProgress variant="determinate" value={progress} />

      <div
        style={{
          height: "100%",
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

          <CardContent style={{ padding: "50px" }}>
            <Typography
              variant="h5"
              align="left"
              component="p"
              style={{ marginBottom: 20 }}
            >
              You are logged out
            </Typography>
            <Typography variant="body1" align="left" component="p">
              If you are using a public computer, please close all windows and
              exit the browser to ensure you are logged out of any connected
              websites.
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
