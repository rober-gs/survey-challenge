import React from 'react';
import PropTypes from 'prop-types';
import { useTimer } from 'react-timer-hook';

export const TimerCustom = ({timer, onExpire}) => {

    const setTimestamp =(timer) => {
        const timestamp = new Date();
        return timestamp.setSeconds(timestamp.getSeconds() + timer);
    }

    const {
        seconds,
        minutes,
        hours,        
    } = useTimer({expiryTimestamp: setTimestamp(timer), onExpire: onExpire });
        
    const customFormat = display =>  {
        return display.toString().length === 1 ? `0${display}` : display
    }
    
    return (
            <div style={{textAlign: 'center'}}>           
            <div style={{fontSize: '40px'}}>
               <span>{ customFormat(hours) }</span>
               :<span>{ customFormat(minutes) }</span>
               :<span>{ customFormat(seconds) }</span>
            </div>
            </div>
        
    )
}

TimerCustom.propTypes = {
    timer: PropTypes.number.isRequired,
    onExpire: PropTypes.func.isRequired
}