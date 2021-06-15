import React, {createContext, useState, useEffect, useContext} from 'react';
import ROUTE from '../app/route';
import axios from 'axios';
import axiosInstance from './api';

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

        const getUserInfo = () => {
            axiosInstance
            .get(
              '/users/user-info/'
            )
            .then(response => {setUserInfo(response.data[0])
              setNavBarInfo(response.data[0])
          })
            .catch(error => {setError(error.response)
            console.log(error.response)})
          }

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
        

      return <Context.Provider value={{navBarInfo, setNavBarInfo, convertDate, rows, setRows, error, setError, userInfo, setUserInfo, getUserInfo, authentication, setAuthentication, state, setState, accessToken, setAccessToken, refreshToken, setrefreshToken}} displayName='Authentication Context'>
          <Component />
      </Context.Provider>
    }
}