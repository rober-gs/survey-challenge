import React, { useState } from 'react'
import PropTypes from 'prop-types';

import { Steps, Button, Result, Spin } from 'antd';
import { CustomInput } from '../components/Input/CustomInput';
import { useAppContext } from '../AppContext';
import useContract from '../hooks/useContract';
import { useSurvey } from '../hooks/useSurvey';

const { Step } = Steps;


export const FormSurvey = ({questions}) => {

	const { accounts, transaction } = useAppContext();

	const contract = useContract();
    const { addSurvey } = useSurvey();
	
	const [current, setCurrent] = useState(0);
	const [finish, setFinish] = useState(false);
	const [response, setResponse] = useState(null);

	const steps =  questions.map( (question, index) => {

		return {
			key: index,
			content: <CustomInput 
						key		={index} 
						data	={question} 						
						next	={(step, value) => next(step, value)}
						current	={current}
					/>,	
		}		
	});

	const next = (step, value) => {	
		
		setResponse({
			...response, 
			[step]:value
		});

		if(current === steps.length - 1) {
			setFinish( true );
		}
		else{			
			setCurrent(current + 1);
		}
	};

	const Onfinish = () => {
		
		const currentAccount = accounts[0];
		addSurvey(contract, currentAccount, response);

		return (

			(!transaction) 
			? <Spin tip="Loading..."/>
			: <Result
				status="success"
				title="Successfully acquired!"
				subTitle={`Your transacction is ${transaction.hash}`}
				extra={[
					<Button type="primary" key="console" href={`https://ropsten.etherscan.io/address/${transaction.hash}` }block>
						Check tx in Ether Scan 
					</Button>,
					
				]}
			/>
		)
		
	}
		
	return (  	
		(finish || transaction) 
		?
			Onfinish()
		:
		<>
			<Steps current={current}>
			{	
				steps.map((item) => (
					<Step key={item.key} />
				))
			}
			</Steps>
			<div style={{
				minHeight: "200px",
				marginTop: "16px",
				paddingTop: "20px",
				paddingBottom: "20px",
				textAlign: "center",
				backgroundColor: "#fafafa",
				border:" 1px dashed #e9e9e9",
				borderRadius: "2px",
			}}>
				{					
					steps[current].content
				}
			</div>		
		</>
	);
};
FormSurvey.propTypes = {
    questions: PropTypes.object.isRequired,
}