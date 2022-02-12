import React, { useEffect, useState } from "react";
import { Layout, Menu } from 'antd';
import { PageHeader } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { ButtonMetamask } from "../components/Button/ButtonMetamask";
import  useContract  from "../hooks/useContract"
import { useSurvey } from "../hooks/useSurvey"
import { useAppContext } from "../AppContext";

const { Header, Content } = Layout;

export const Dashboard = () => {

    const contract = useContract();
    const { surveyAvailable, getBalance } = useSurvey();


    const { available, balance } = useAppContext();


    useEffect(() => {    
        getBalance(contract);
        surveyAvailable(contract);
    }, []);

    return (
          <Layout>
                <Header className="header">
                    <div className="logo" />
                    <Menu theme="dark" mode="horizontal" >               
                        <Menu.Item key="MetaMask" icon={<UserOutlined />} style={{ background: "#001529" }} >                            
                            <ButtonMetamask />
                        </Menu.Item>   
                    </Menu>
                </Header>
                <Layout>
                    <Layout style={{ padding: "0 24px 24px" }}>
                          <PageHeader
                              ghost={false}           
                              title=""
                              subTitle=""
                              extra={[
                                `$QUIZ: ${ balance }`
                              ]}
                          />          
                          <Content
                              className="site-layout-background"
                              style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                              }}
                          >
                          </Content>
                    </Layout>
                </Layout>
          </Layout>
    );
};
