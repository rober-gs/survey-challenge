import React from "react";
import { Layout, Menu } from 'antd';
import { PageHeader } from 'antd';

import { UserOutlined } from '@ant-design/icons';
import { ButtonMetamask } from "../components/Button/ButtonMetamask";

const { Header, Content } = Layout;

export const Dashboard = () => {
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
                "$QUIZ: 8.78"
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
