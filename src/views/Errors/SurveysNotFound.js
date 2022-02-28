import React from 'react'
import { Result } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

export const SurveysNotFound = () => {
    return (
        <Result
            icon={<SmileOutlined />}
            title="Great, we have done all the surveys!"
        />
    );
}
