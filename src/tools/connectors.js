import { InjectedConnector } from '@web3-react/injected-connector';

export const injected = new InjectedConnector({ 
    supportedChainIds: [3 /* ropstein */, 1337 /* Ganache test */] 
});