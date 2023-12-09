import React, { useState,useEffect } from 'react'
import { vehicleModel } from '../../Interfaces/vehicleModel'
import './Styles/Circle.css'
import formatTime from '../../Utility/formatTime';


function Circle(props:{vehicle:vehicleModel}) {

    const {vehicle} = props;
    const [countdown,setCountdown] = useState(calculateCountDown());



function calculateCountDown(){
    const endTime = new Date(vehicle.endTime).getTime();
    const currentTime = new Date().getTime();
    const timeRemaining = endTime - currentTime;
    if (timeRemaining === 0) {
        return 0;
    }
    return Math.max(0,timeRemaining); 
}

useEffect(()=>{
    const interval = setInterval(()=>{
        setCountdown(calculateCountDown());
        if (countdown === 0) {
            clearInterval(interval);

        }
    },1000);

    return () => {
        clearInterval(interval);
    }
},[countdown])




  return (
    <div className='circle' style={{display:'flex',justifyContent:'center',alignItems:'center'}} >
        <h1 className='text-dark' style={{fontSize:'16px'}} >
            {countdown === 0 ? 'Auction Ended' : formatTime(countdown)}
        </h1>
    </div>
  )
}

export default Circle
