import React, { useEffect } from "react";
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';

import { Modal } from "antd";
import { Button } from 'antd';
import Text from "antd/lib/typography/Text";

import { PoweroffOutlined } from '@ant-design/icons';
import { shortenAddress } from "../../tools/utilities";
import { injected } from "../../tools/connectors";

export const ButtonMetamask = () => {
    
    const { activate, active, account } = useWeb3React();
    
    useEffect(() => {

        if (!account || !active) {
            console.log("CONNECT BTN METAMASK");
            connect();
        }

    }, [account, active])
    
    const connect = async() => {
        await activate(injected, (e)=> {
            if(e instanceof UnsupportedChainIdError){
                errorChain();
            }
        });
    }

    const switchChain = () => {        
        window
            .ethereum
            .request({
                method: 'wallet_switchEthereumChain',
                params:[{
                    "chainId": "0x3"
                }]
            });     
    }

    const errorChain = () => {
        Modal.error({
            title: "Plase change network",            
            content: "This dapp only allows connections to Ropstein's network.",    
            okText: "Change Network", 
            onOk: () => switchChain(),
        });      
    }
    return (
            ! active
            ?
                <Button  
                    type="primary"
                    onClick={()=> connect()}
                    icon={<PoweroffOutlined />}
                >
                    Connect with MetaMask
                </Button>
            :                    
                <Text
                    style={{color:"white"}}
                    copyable={{ text: `${account}`}} 
                >
                    {shortenAddress(account, 4,8)}                                
                </Text>                            
    )
};