import React, {createContext, useState, useEffect, useContext} from 'react';
import ROUTE from '../app/route';
import axios from 'axios';
import axiosInstance from './api';
import { useMediaQuery } from 'react-responsive';
import { BorderAll } from '@material-ui/icons';

export const Context = createContext();

export const withContext = (Component) => {
    return function Provider(){
        const [authentication, setAuthentication] = useState(false);
        const [state, setState] = useState(true);
        const [accessToken, setAccessToken] = useState();
        const [refreshToken, setrefreshToken] = useState();
        const [userInfo, setUserInfo] = useState();
        const [error, setError] = useState();
        const [rows, setRows] = useState([]);
        const [navBarInfo, setNavBarInfo] = useState();
        const [role, setRole] = useState('student');
        const [isGoogleLogged, setIsGoogleLogged] = useState(false);
        const [isMicrosoftLogged, setIsMicrosoftLogged] = useState(false);
        const [microsoftAccessToken, setMicrosoftAccessToken] = useState();
        const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

        const getUserInfo = () => {
            axiosInstance
            .post(
              '/users/user-info/', {role: role}
            )
            .then(response => {setUserInfo(response.data[0])
              setNavBarInfo(response.data[0])
          })
            .catch(error => {setError(error.response)
            console.log(error.response)})
          }


          const handleFileDownload = (document_info) => {
            const downloadUrl = `/api/download/${document_info.id}/`;
            axiosInstance({
              url: downloadUrl,
              method: 'GET',
              responseType: 'blob'
            })
              .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", document_info.name.replace(/ /g, '_'));
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
              })
              .catch((error) => {
                console.log(error);
              });
          };

          const convertDate = (date) => {
            if (date) {

            var d = new Date(date);
            let options = {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric"
            };
            options.hour12 = true;
            var dt = d.toLocaleString("en-US", options);
            return dt;
          }};

          const getAwardYear = (term) => {
            // roll over to next academic year in April
            var d = new Date();
            let y = d.getFullYear();
            let m = d.getMonth();
            switch (term){
              case "May":
                if (m >= 3){
                return `${term} ${y}`} 
                else {
                  return `${term} ${(y - 1)}`
                };
                break;
              case "September":
                if (m >= 3){
                return `${term} ${y}`} 
                else {
                  return `${term} ${(y - 1)}`
                };
                break;
                case "January":
                if (m >= 3){
                  return `${term} ${(y + 1)}`} 
                  else {
                    return `${term} ${y}`
                  };
                  break;
            }
          }

          const getAwardYearSubmitted = (term, date_submitted) => {
            // roll over to next academic year in April
            // using django datestamp submitted_at
            let y = parseInt(date_submitted.substring(0,4));
            let m = parseInt(date_submitted.substring(5,7));
            switch (term){
              case "May":
                if (m >= 3){
                return `${term} ${y}`} 
                else {
                  return `${term} ${(y - 1)}`
                };
                break;
              case "September":
                if (m >= 3){
                return `${term} ${y}`} 
                else {
                  return `${term} ${(y - 1)}`
                };
                break;
                case "January":
                if (m >= 3){
                  return `${term} ${(y + 1)}`} 
                  else {
                    return `${term} ${y}`
                  };
                  break;
                }
              }
        

      return <Context.Provider value={{role, setRole, isMobile, navBarInfo, setNavBarInfo, convertDate, getAwardYear, getAwardYearSubmitted, rows, setRows, error, setError, userInfo, setUserInfo, getUserInfo, authentication, setAuthentication, state, setState, accessToken, setAccessToken, refreshToken, setrefreshToken, isGoogleLogged, setIsGoogleLogged, isMicrosoftLogged, setIsMicrosoftLogged, microsoftAccessToken, setMicrosoftAccessToken, handleFileDownload}} displayName='Authentication Context'>
          <Component />
      </Context.Provider>
    }
}