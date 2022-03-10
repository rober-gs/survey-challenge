import React from 'react'
import PropTypes from 'prop-types';

import { Space } from 'antd';
import { SurveyCard } from '../components/Card/SurveyCard'


export const HomeView = ({surveys, available}) => {  
    
    return (
        <Space size={'middle'} >
            
            {                
                surveys.map( (survey, index) => {
                    const { title, image, questions } = survey;                                           
                    return (                        
                        <SurveyCard 
                            key={ index }
                            title={ title }
                            image={ image }
                            questions={ questions }
                            available={ available }                        
                        />                       
                    )
                })
            }
        </Space>
    )
}
HomeView.propTypes = {
    surveys: PropTypes.array.isRequired,
    available: PropTypes.bool.isRequired
}