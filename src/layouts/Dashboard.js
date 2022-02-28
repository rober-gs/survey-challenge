import React, { useEffect } from "react";

import { Layout } from 'antd';
import { Modal } from "antd";

import useContract from "../hooks/useContract"
import { useSurvey } from "../hooks/useSurvey"

import { HomeView } from "../views/HomeView";
import { SurveysNotFound } from "../views/Errors/SurveysNotFound";
import { NavBar } from "../components/Navbar/NavBar";

import { useAppContext } from "../AppContext";
import { FormSurvey } from "../views/FormSurvey";

const { Content } = Layout;

export const Dashboard = () => {

    const contract = useContract();
    const { surveyAvailable, getBalance, getSurveys } = useSurvey();
    const { available, surveys, selectedSurvey, setAccounts } = useAppContext();

    
    const {init, data} = selectedSurvey;

    const ROPSTEIN = "0x3";

    useEffect(() => {
        AutoConnect();
    }, []);

    const AutoConnect = () => {         
        window.ethereum
        .request({ 
            method: "eth_requestAccounts",
            params:[{
                "chainId": "0x3"
            }]
        })        
        .then( accounts => {            
            
            setAccounts(accounts);
            const currentAccount = accounts[0];

            window.ethereum
            .request({ method: 'eth_chainId' })
            .then( chainID => {                    
                console.log("chainID ", chainID)
                if (chainID === ROPSTEIN || chainID === "0x539") {          
                    getSurveys();        
                    surveyAvailable(contract, currentAccount);
                    getBalance(contract, currentAccount);  
                }
                else{
                    window.ethereum
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
                        });    
            
                        console.error(resp);
                    });  
                }
            });
        })
        .catch(({message}) => {
            
            Modal.error({
                title: "MetaMask Error",            
                content: message,
            });   
        });        
          
    }

    const SwitchDisplay = () => { 
        if (init) {

           return <FormSurvey questions={data} />;

        } else {

            return ( surveys.length === 0 )
            ? <SurveysNotFound />
            : <HomeView 
                surveys={surveys} 
                available={available}
              />;
        }
    }

    return (
        <Layout>
            <NavBar/>
            <Layout>
                <Layout style={{ padding: "0 24px 24px" }}>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        <SwitchDisplay />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};
