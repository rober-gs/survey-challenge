import React from 'react'

import { Web3ReactProvider } from '@web3-react/core';
import { AppContextProvider } from './AppContext'
import { ethers } from 'ethers';

import { Dashboard } from './layouts/Dashboard';
import { MetaMaskNotFound } from './views/Errors/MetaMaskNotFound';

import 'antd/dist/antd.css';

export const MainApp = () => {
    
    const library = (provider) => new ethers.providers.Web3Provider(provider);  
    
    if( window?.ethereum){ 
        const accoundChange = window?.ethereum.on("accountsChanged",() => window.location.reload());
    }
    return (
        ( !window.ethereum ) 
        ? <MetaMaskNotFound />
        : <AppContextProvider>
                <Web3ReactProvider getLibrary={library}>
                        <Dashboard />            
                </Web3ReactProvider>
            </AppContextProvider>
    )
}