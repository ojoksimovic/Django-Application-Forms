import React, {createContext, useState, useEffect, useContext} from 'react';
import ROUTE from '../app/route';
import axios from 'axios';
import axiosInstance from './api';
import { useMediaQuery } from 'react-responsive';

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
          console.log('context api call:' + {role})
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
            axiosInstance
            .get(downloadUrl)
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
        

      return <Context.Provider value={{role, setRole, isMobile, navBarInfo, setNavBarInfo, convertDate, rows, setRows, error, setError, userInfo, setUserInfo, getUserInfo, authentication, setAuthentication, state, setState, accessToken, setAccessToken, refreshToken, setrefreshToken, isGoogleLogged, setIsGoogleLogged, isMicrosoftLogged, setIsMicrosoftLogged, microsoftAccessToken, setMicrosoftAccessToken, handleFileDownload}} displayName='Authentication Context'>
          <Component />
      </Context.Provider>
    }
}