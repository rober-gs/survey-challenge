  
import React, { createContext, useContext, useReducer } from 'react';

const initialContext = {
    accounts: [],
    balance: null,
    transaction:null, 
    receipt: null,
    available: null,
    surveys:[],
    selectedSurvey:{
        init: false,
        data: null,
    },
};

const AppContext = createContext(initialContext);

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  
    const [store, dispatch] = useReducer(appReducer, initialContext);

    const contextValue = {
        accounts: store.accounts,
        setAccounts: ( accounts ) => {
            dispatch({
                type: TYPES.setAccounts,
                payload: accounts
            });
        },
        balance: store.balance,
        setBalance: ( balance ) => {            
            dispatch({
                type: TYPES.setBalance,
                payload: balance 
            });
        },
        surveys: store.surveys, 
        setSurveys: ( data ) => {
            dispatch({
                type: TYPES.setSurveys,
                payload: data
            });
        },
        selectedSurvey: store.selectedSurvey,
        setSelectSurvey: ( data ) => {
            dispatch({
                type: TYPES.setSelectSurvey, 
                payload: data
            });
        },
        receipt: store.receipt,
        setReceipt: ( receipt ) => {
            dispatch({ 
                type: TYPES.setReceipt,
                payload: receipt
            });
        },

        transaction: store.transaction,
        setTransaction: ( transaction ) => {
            dispatch({ 
                type: TYPES.setTransaction,
                payload: transaction
            });
        },
        available: store.available,
        setAvailable: ( available ) => {            
            dispatch({
                type: TYPES.setAvailable,
                payload: available
            })
        }      

    };

    return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

const appReducer = (state, { type, payload }) => {

    switch (type) {
       
        case TYPES.setAccounts:
            return {
                ...state,
                accounts: payload,
            };
        case TYPES.setBalance:            
            return {
                ...state,
                balance: payload,
            };
        case TYPES.setSurveys:
            return {
                ...state,
                surveys: payload,
            };
        case TYPES.setSelectSurvey:
            return {
                ...state,
                selectedSurvey: payload,
            };
        case TYPES.setTransaction:
            return {
                ...state,
                transaction: payload,
            };
        case TYPES.setAvailable:            
            return {
                ...state,
                available: payload,
            };
        case TYPES.setReceipt:        
            return {
                ...state,
                receipt:payload,
            };
        default:
            return state;
    }
};
const TYPES = {
    setAccounts:              'Set Account List', 
    setBalance:               'Set Ethereum Balance',
    setSurveys:               'Get The Surveys', 
    setTransaction:           'Set Data transaction',  
    setReceipt:               'Set Receipt for trasaction',
    setAvailable:             'Obtains the availability surveys', 
    setSelectSurvey:          'Set Data of the selected survey', 
}