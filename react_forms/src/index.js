import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {GoogleOAuthProvider} from '@react-oauth/google';
import "bootstrap/dist/css/bootstrap.min.css";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from './components/login/authConfig';

const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.render(
  <GoogleOAuthProvider
            clientId="204015068211-jgmfbadombr9cm61c91fda56cfkisfdn.apps.googleusercontent.com">
  <React.StrictMode>
  <MsalProvider instance={msalInstance}>
    <App />
    </MsalProvider>
  </React.StrictMode>
  </GoogleOAuthProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
