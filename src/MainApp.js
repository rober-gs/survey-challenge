import React from 'react'

import { AppContextProvider } from './AppContext'
import { Dashboard } from './layouts/Dashboard';
import { MetaMaskNotFound } from './views/Errors/MetaMaskNotFound';

import 'antd/dist/antd.css';

export const MainApp = () => {
    
    
    window.ethereum?.on("accountsChanged",() => window.location.reload());
    
    
    return (
        ( !window.ethereum ) 
        ?   <MetaMaskNotFound />
        :   <AppContextProvider>                
                <Dashboard />
            </AppContextProvider>
    )
}