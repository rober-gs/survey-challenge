import React from 'react'
import { Typography, Layout, Space, Row, Col } from 'antd';

import { ButtonMetamask } from '../Button/ButtonMetamask';
import { useAppContext } from '../../AppContext';

const { Text } = Typography;
const { Header } = Layout;

export const NavBar = () => {
    const { balance } = useAppContext();
    return (
        <Header className="header">
            <Row>
                {
                    <Col span={4}>
                        <Space size="large">
                            <Text style={{color:"white"}} >
                                {`BALANCE: $ ${ balance } QUIZ`}
                            </Text>
                        </Space>
                    </Col>
                }
                
                <Col span={4} offset={16}>
                    <Space size="large">
                        <ButtonMetamask />     
                    </Space>
                </Col>
            </Row>
        </Header>
    
  )
}
