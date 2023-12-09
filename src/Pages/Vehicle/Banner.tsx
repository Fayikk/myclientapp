import React, { useEffect, useState } from 'react'
import './Styles/banner.css'
import { useDispatch } from 'react-redux'
import { setSearchItem } from '../../Storage/Redux/vehicleSlice';
function Banner() {

  const [value,setValueState] = useState("");
  const Dispatch = useDispatch();



  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    Dispatch(setSearchItem(value))
    setValueState(e.target.value);

  }



useEffect(()=>{
  if (value==="") {
      Dispatch(setSearchItem(""))
  }
},[value])



  return (
    <div className='custom-banner' >
        <div className='m-auto d-flex align-items-center' style={{width:"400px",height:"50vh"}} >
            <div className='d-flex align-items-center' style={{width:"100%"}} >
                <input type='text' className='form-control rounded-pill' style={{width:"100%",padding:"20px 20px"}} placeholder='Search Car' 
                onChange={handleChange} ></input>
                <span style={{position:"relative" , left:"-45px"}} >
                    <i className='bi bi-search' ></i>
                </span>
            </div>
        </div>
    </div>
  )
}

export default Banner
