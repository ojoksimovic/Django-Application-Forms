import React, { useState, useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  Button,
  Drawer,
  Divider,
  Collapse,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { ExpandLess, ExpandMore, VerifiedUser } from "@material-ui/icons";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import "./hamburgers.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import ROUTE from "./route";
import "./style.css";
import { Context, withContext } from "../app/context";
import { useHistory } from "react-router-dom";
import axiosInstance from "./api";
import { useMsal } from "@azure/msal-react";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#00204E",
    color: "white",
    fontFamily: "Roboto",
    fontWeight: "300",
    fontSize: "1.4rem",
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    zIndex: 0,
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    marginTop: 65,
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(1, 3),
    paddingTop: 20,
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
}));

const NavBar = () => {
  const {
    isMobile,
    navBarInfo,
    setNavBarInfo,
    userInfo,
    setUserInfo,
    getUserInfo,
    authentication,
    setAuthentication,
    state,
    setState,
    rows,
    setRows,
    convertDate,
    createRows,
    isGoogleLogged,
    setIsGoogleLogged,
    isMicrosoftLogged,
    setIsMicrosoftLogged,
  } = useContext(Context);

  const [open, setOpen] = useState(true);
  const [securityOpen, setSecurityOpen] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (!loaded) {
      getUserInfo();
      if (isMobile) {
        setState(false);
      }
      setLoaded(true);
    }
    return () => {
      setUserInfo(null);
    };
  }, []);

  //Microsoft Account (MSAL)
  const { instance } = useMsal();

  const handleLogoutClick = async () => {
    
    // if Microsoft Account is logged in, wait for user to sign out
    if (isMicrosoftLogged) {
      instance.logoutPopup({
        postLogoutRedirectUri: "/",
        mainWindowRedirectUri: "/",
      });
    }
    // sign user out of app
    try {
      const response = await axiosInstance.post("/users/blacklist/", {
        refresh_token: localStorage.getItem("refresh_token"),
      });
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      setLoaded(false);
      setNavBarInfo();
      setRows([]);
      setUserInfo(null);
      setAuthentication(false);
      history.push(ROUTE.LOGOUT);
      axiosInstance.defaults.headers["Authorization"] = null;
      if (isGoogleLogged) {
        setIsGoogleLogged(false);
      }
      return response;
    } catch (e) {
      console.log(e);
    }
  };
  const handleHamburgerClick = () => {
    setState(!state);
  };

  const classes = useStyles();
  const theme = useTheme();

  return (
    <div>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <button
            onClick={handleHamburgerClick}
            class={
              state
                ? "navbar-toggler hamburger hamburger--vortex is-active"
                : "navbar-toggler hamburger hamburger--vortex"
            }
            type="button"
            data-toggle="collapse"
            data-target="#navbarToggler"
            aria-controls="navbarToggler"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{
              color: "transparent",
              marginRight: 10,
            }}
          >
            <span class="hamburger-box">
              <span class="hamburger-inner"></span>
            </span>
          </button>
          <Typography variant="h6" noWrap>
            Forms
          </Typography>
        </Toolbar>
      </AppBar>

      <div className={classes.root}>
        <CssBaseline />
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={state}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <Typography variant="h5" style={{ fontWeight: "800" }}>
              {navBarInfo?.first_name} {navBarInfo?.last_name}
            </Typography>
          </div>
          <div className={classes.drawerHeader}>
            <Button
              className="button"
              onClick={handleLogoutClick}
              variant="contained"
            >
              Logout
            </Button>
            <Button variant="contained">
              FIPPA <VerifiedUser style={{ marginLeft: 5 }} />
            </Button>
          </div>
          <Divider />
          <List>
            <ListItem button onClick={() => setOpen(!open)}>
              <ListItemText primary="Forms" />

              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding style={{ paddingLeft: 20 }}>
                <ListItem button component={Link} to={ROUTE.MY_FORMS}>
                  <ListItemText style={{ color: "black" }} primary="My Forms" />
                </ListItem>
                <ListItem button component={Link} to={ROUTE.NEW_FORM}>
                  <ListItemText style={{ color: "black" }} primary="New Form" />
                </ListItem>
              </List>
            </Collapse>
          </List>
          <List>
            <ListItem button onClick={() => setSecurityOpen(!securityOpen)}>
              <ListItemText primary="Security" />

              {securityOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={securityOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding style={{ paddingLeft: 20 }}>
                <ListItem button>
                  <ListItemText style={{ color: "black" }} primary="Groups" />
                </ListItem>
                <ListItem button>
                  <ListItemText style={{ color: "black" }} primary="Users" />
                </ListItem>
              </List>
            </Collapse>
          </List>
        </Drawer>
      </div>
    </div>
  );
};

export default NavBar;
