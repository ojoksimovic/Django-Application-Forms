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

        const getUserInfo = () => {
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
            console.log(data)
            axiosInstance
            .post(
              '/api/payment-activation/', data
            )
            .then(response => {
                console.log(response)
          })
            .catch(error => {setError(error.response.status)
            console.log(error.response)})
          }

          const editPaymentActivationForm = (data) => {
            console.log(accessToken)
            axiosInstance
            .patch(
              '/api/payment-activation/', data
            )
            .then(response => {
                console.log(response)
          })
            .catch(error => {setError(error.response.status)
            console.log(error.response)})
          }

      return <Context.Provider value={{getPaymentActivationForm, createPaymentActivationForm, editPaymentActivationForm, error, setError, userInfo, setUserInfo, getUserInfo, authentication, setAuthentication, state, setState, accessToken, setAccessToken, refreshToken, setrefreshToken}} displayName='Authentication Context'>
          <Component />
      </Context.Provider>
    }
}