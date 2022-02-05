  
import React, { createContext, useContext, useReducer } from 'react';


const initialContext = {
    balance: null,
    transaction:null
};

const appReducer = (state, { type, payload }) => {

    switch (type) {
       
        case TYPES.setBalance:
            return {
                ...state,
                balance: payload,
            };
        case TYPES.setTransaction:
            return {
                ...state,
                transaction: payload,
            };
        default:
            return state;
    }
};

const AppContext = createContext(initialContext);

export const useAppContext = () => useContext(AppContext);
export const AppContextProvider = ({ children }) => {
  
    const [store, dispatch] = useReducer(appReducer, initialContext);

    const contextValue = {

        balance: store.balance,
        setBalance: ( balance ) => {
            dispatch({
                type: TYPES.setBalance,
                payload: balance 
            });
        },
        
        transaction: store.transaction,
        setTransaction: ( transaction ) => {
            dispatch({ 
                type: TYPES.setTransaction,
                payload: transaction
            });
        },

  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

const TYPES = {
    setBalance:               'Set Ethereum Balance',
    setTransaction:           'Set Data transaction',  
}