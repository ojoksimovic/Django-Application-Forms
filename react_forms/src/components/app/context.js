import React, {createContext, useState, useEffect, useContext} from 'react';

export const Context = createContext();

export const withContext = (Component) => {
    return function Provider(){
        const [authentication, setAuthentication] = useState(false);
        const [state, setState] = useState(true);
        const [accessToken, setAccessToken] = useState();
        const [refreshToken, setrefreshToken] = useState();


      return <Context.Provider value={{authentication, setAuthentication, state, setState, accessToken, setAccessToken, refreshToken, setrefreshToken}} displayName='Authentication Context'>
          <Component />
      </Context.Provider>
    }
}