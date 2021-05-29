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
            console.log(accessToken)
            axiosInstance
            .get(
              '/users/user-info/'
            //   { headers: { 'Authorization': 'JWT ' + accessToken  }
            )
            .then(response => {setUserInfo(response.data[0])
                console.log(response)
          })
            .catch(error => {setError(error.response.status)
            console.log(error.response)})
          }

      return <Context.Provider value={{error, setError, userInfo, setUserInfo, getUserInfo, authentication, setAuthentication, state, setState, accessToken, setAccessToken, refreshToken, setrefreshToken}} displayName='Authentication Context'>
          <Component />
      </Context.Provider>
    }
}