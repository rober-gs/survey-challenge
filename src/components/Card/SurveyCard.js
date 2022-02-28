import React from 'react'

import { Button, Card } from 'antd';
import { message, Popconfirm } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { StopOutlined  } from '@ant-design/icons';
import { useAppContext } from '../../AppContext';

const { Meta } = Card;

export const SurveyCard = ( {title, image, questions, available}) => {
    

	const { setSelectSurvey } = useAppContext()

    const warning = () => {
    	message.warning('Not available at this time');
    };

    const onConfirm = () => {
		
		setSelectSurvey({
			init: true, 
			data: questions
		});
    }

    return  (
        <Card 
            style={{ width: 300, marginTop: 16 }} 
            loading={ title === undefined }
            cover={
                  <img
                      alt="img"
                      src={ image }
                  />
              }
              actions={[
                available
                ?
                  <Popconfirm
                    key="play"
                    title="This action will start the survey, Are you sure to start?"
                    onConfirm={()=> onConfirm() }
                    //onCancel={()=> console.log("onCancel")}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button type="primary" icon={<CaretRightOutlined />} />
                    
                  </Popconfirm>
                : <StopOutlined  key="notAvailable" onClick={()=> warning()} />
             
              ]}
        >
            <Meta               
                title={title}
                description= {`Total of questions: ${ questions.length }`}
            />
        </Card>
    )
}
