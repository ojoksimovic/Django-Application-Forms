import React, {createContext, useState, useEffect, useContext} from 'react';

export const Context = createContext();

export const withContext = (Component) => {
    return function Provider(){
        const [authentication, setAuthentication] = useState(false);


      return <Context.Provider value={{authentication, setAuthentication}} displayName='Authentication Context'>
          <Component />
      </Context.Provider>
    }
}