import { useWeb3React } from '@web3-react/core';
import { useCallback } from 'react';
import { useAppContext } from '../AppContext';

export const useSurvey = () => {
    
    const { account } = useWeb3React();  
    const {
        setBalance, 
        setAvailable,
    } = useAppContext();


    const surveyAvailable = useCallback( async( contract ) => {

        try {
            
            contract.surveyAvailable()
                .then( available => setAvailable(available) );            

        } catch (error) {
            console.log("error", error)
        }
    },[]);
    
    const getBalance = useCallback( async( contract ) => {
       
        try {
            contract.balanceOf(account)
                .then( balance => setBalance(balance) );            
        
        } catch (error) {
            console.log("error", error)
        }
    },[]);
    
    return{ surveyAvailable, getBalance }
}
