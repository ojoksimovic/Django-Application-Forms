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
        const [formInfo, setFormInfo] = useState();
        const [error, setError] = useState();
        const [rows, setRows] = useState([]);

        const getUserInfo = () => {
          setUserInfo(null)
            axiosInstance
            .get(
              '/users/user-info/'
            )
            .then(response => {setUserInfo(response.data[0])
                console.log(response)
                
          })
            .catch(error => {setError(error.response.status)
            console.log(error.response)})
          }

          const getPaymentActivationForm = () => {
            axiosInstance
            .get(
              '/api/payment-activation/'
            )
            .then(response => {
                console.log(response)
          })
            .catch(error => {setError(error.response.status)
            console.log(error.response)})
          }

          const createPaymentActivationForm = (data) => {
            axiosInstance
            .post(
              '/api/payment-activation/', data
            )
            .then(response => { setFormInfo(response.data)
                console.log(response)
          })
            .catch(error => {setError(error.response.status)
            console.log(error.response)})
          }

          const editPaymentActivationForm = (data) => {
            axiosInstance
            .patch(
              '/api/payment-activation/', data
            )
            .then(response => { setFormInfo(response.data)
                console.log(response)
          })
            .catch(error => {setError(error.response.status)
            console.log(error.response)})
          }


          const convertDate = (date) => {
            var d = new Date(date);
            let options = {
              weekday: "short",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
            };
            options.hour12 = true;
            var dt = d.toLocaleString("en-US", options);
            return dt;
          };
        

      return <Context.Provider value={{convertDate, rows, setRows, formInfo, setFormInfo, getPaymentActivationForm, createPaymentActivationForm, editPaymentActivationForm, error, setError, userInfo, setUserInfo, getUserInfo, authentication, setAuthentication, state, setState, accessToken, setAccessToken, refreshToken, setrefreshToken}} displayName='Authentication Context'>
          <Component />
      </Context.Provider>
    }
}