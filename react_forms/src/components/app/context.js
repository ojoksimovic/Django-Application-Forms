import React, {createContext, useState, useEffect, useContext} from 'react';

export const Context = createContext();

export const withContext = (Component) => {
    return function Provider(){
        const [authentication, setAuthentication] = useState(false);
        const [state, setState] = useState(true);

      return <Context.Provider value={{authentication, setAuthentication, state, setState}} displayName='Authentication Context'>
          <Component />
      </Context.Provider>
    }
}