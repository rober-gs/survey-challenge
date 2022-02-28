import React, { useState } from 'react'

import { Button, Divider, Image, Radio, Space } from 'antd';
import { Typography } from 'antd';
import { TimerCustom } from '../Timer/TimerCustom'


const { Title } = Typography;


export const CustomInput = ({data,  current, next}) => {    

    const { text, image, lifetimeSeconds, options} = data;     
    
    const [value, setValue] = useState(0);    
    
    const onChange = (e) => {        
        setValue(e.target.value)        
	}

    return ( 
        <Space direction='vertical'>
            
            <TimerCustom 
                timer={lifetimeSeconds} 
                onExpire={() => {                   
                    next(current, value)
                }
            }/>                
            <Image
                width="80%"
                height={300}
                src={image}
                preview={false}
            />            
            <Divider style={{ marginTop:"2px", marginLeft:"12px"}} />
            <Title level={2}> 
                { text }
            </Title>
            <Radio.Group onChange={onChange} value={value}>
                <Space direction="vertical">                    
                    {
                        options.map( (item, index) =>{
                            return <Radio value={index + 1} key={index}>{ item.text }</Radio>
                        })
                    }
                </Space>
            </Radio.Group>
            <Divider style={{ marginTop:"2px", marginLeft:"12px"}} />
            <Button type='primary' block onClick={()=>next(current, value)}> Done </Button>
        </Space>
            
            
        
	)
}
