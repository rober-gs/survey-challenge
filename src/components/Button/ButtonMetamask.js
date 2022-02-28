import React from "react";

import { Modal } from "antd";
import { Button } from 'antd';
import { Space } from 'antd';
import { Avatar } from 'antd';
import { Image } from 'antd';
import Identicon from 'identicon.js';
import Text from "antd/lib/typography/Text";
import { PoweroffOutlined } from '@ant-design/icons';
import { shortenAddress } from "../../tools/utilities";
import { useAppContext } from "../../AppContext";
import useContract from "../../hooks/useContract";
import { useSurvey } from "../../hooks/useSurvey";

export const ButtonMetamask = () => {
    
    const ROPSTEIN = "0x3";
    
    const contract = useContract();
    const { surveyAvailable, getBalance, getSurveys } = useSurvey();
    const { accounts, setAccounts } = useAppContext();
    

    const account = accounts[0];

     
    const connect = () => {
        
        window.ethereum
        .request({ 
            method: "eth_requestAccounts",
            params:[{
                "chainId": "0x3"
            }]
        })        
        .then( accounts => {
            setAccounts(accounts)
            const currentAccount = accounts[0];
            
            window.ethereum
            .request({ method: 'eth_chainId' })
            .then( chainID => {
                if (chainID === ROPSTEIN || chainID === "0x539") {
                    getSurveys();        
                    surveyAvailable(contract, currentAccount);
                    getBalance(contract, currentAccount);  
                }
                else{                    
                    switchChain();                                
                }
            });
        })
        .catch(({message}) => {
            
            Modal.error({
                title: "MetaMask Error",            
                content: message,    
                okText: "Try Again", 
                onOk: () => connect(),
            });   
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
        })
        .catch(resp => {
            
            Modal.error({
                title: "Plase change network",            
                content: "This dapp only allows connections to Ropstein's network.",    
                okText: "Change Network", 
                onOk: () => switchChain(),
            });    

            console.error(resp);
        });    
    }

    return (
            (accounts.length === 0) 
            ?   
                <Button  
                    type="primary"
                    onClick={ ()=> connect() }
                    icon={ <PoweroffOutlined /> }
                >
                    Connect Wallet
                </Button>
            :   
                <Space > 
                    <Avatar
                        src={ 
                            <Image 
                               src={ `data:image/png;base64,${new Identicon(account, 30).toString()}` }
                                preview={ false }
                                style={{ width: 42 }} 
                            />
                        }
                        shape="square"
                    />
                    <Text                        
                        style={{color:"white"}}
                        copyable={{ text: `${account}`}}                         
                    >
                        {shortenAddress(account, 6, 4)}                                
                    </Text>                            
                
                </Space>                           
    )
};