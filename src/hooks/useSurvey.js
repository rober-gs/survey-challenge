import Modal from 'antd/lib/modal/Modal';
import { useCallback } from 'react';
import { useAppContext } from '../AppContext';
import { getSurveysData } from '../services/surveyServices';
import { customFormat } from '../tools/utilities';


export const useSurvey = () => {

    const {
        setSurveys,
        setBalance, 
        setReceipt,
        setAvailable, 
        setTransaction,
    } = useAppContext();

    const getSurveys = () => {        
        try  {
            setSurveys( getSurveysData() );      
        } catch( error ){
            console.error("error", error);
        }
    }

    const surveyAvailable = useCallback( async( contract, account ) => {
        try {            
            
            if (account) 
            {
                contract.surveyAvailable({
                    from: account
                })
                .then( available => {                               
                    setAvailable(available)
                })
                .catch( ({ message }) => {
                    Modal.error({
                        title: "Error",            
                        content: message,    
                        okText: "Try Again", 
                        onOk: () => { window.location.reload() },
                    });   
                });          
            }  

        } catch (error) {
            console.error("error", error)
        }
    },[]);
    
    const getBalance = useCallback( async( contract, account ) => {
        try {            
            if(account)
            {
                contract.balanceOf(account, {
                    from: account
                })
                .then( balance => {
                    setBalance(customFormat(balance) )
                }) 
                .catch( ({ message }) => {
                    Modal.error({
                        title: "Error",            
                        content: message,    
                        okText: "Try Again", 
                        onOk: () => { window.location.reload() },
                    });   
                });            
            }
        } catch (error) {
            console.error("error", error)
        }
    },[]);

    const addSurvey = useCallback(async(contract, account, response) => {

        try {
            if (account) 
            {
                console.log("addSurvey");
                const responseStr = JSON.stringify(response)
                console.log("respStr", responseStr)                
                contract.addSurvey(responseStr)
                .then( tx => {
                    console.log("TX", tx);
                    setTransaction( tx );
                })
                .catch( ({ message }) => {

                    Modal.error({
                        title: "MetaMask Error",            
                        content: message,    
                        okText: "Try Again", 
                        onOk: () => { window.location.reload() },
                    });   
                });
            }
        } catch (error) {
            console.error("error ", error)
        }
    }, []);
    
    return{ getSurveys, surveyAvailable, getBalance, addSurvey }    
}
