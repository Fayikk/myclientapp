import React, { useEffect } from 'react'
import './Styles/Header.css'
import { useSelector } from 'react-redux'
import userModel from '../Interfaces/userModel'
import { RootState } from '../Storage/store'
import { useDispatch } from 'react-redux'
import { InitialState, setLoggedInUser } from '../Storage/Redux/authenticationSlice'
import {NavLink, useNavigate} from 'react-router-dom'

function Header() {

    const userStore : userModel = useSelector((state:RootState) => state.authenticationStore);
    const token = localStorage.getItem("token");
    const Dispatch = useDispatch();

    const navigate = useNavigate();
    useEffect(()=>{

    },[userStore])    


    const handleLogout = () => {
        localStorage.removeItem("token");
        Dispatch(setLoggedInUser({...InitialState}))
        navigate("/");
    }


  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-gray">
  <div className='container' >

<a className="navbar-brand" href="/">My Galaxy Auction</a>
<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
 <span className="navbar-toggler-icon"></span>
</button>

<div className="collapse navbar-collapse" id="navbarSupportedContent">
 <ul className="navbar-nav mr-auto">


 {
    userStore ? (    <li className="nav-item">
    <a className="nav-link" href="#"> {userStore.fullName} </a>
  </li> ) : ""
 }


{
  userStore.role === "Administrator" ? (
    <div className="collapse navbar-collapse mr-2" id="navbarNavDarkDropdown">
    <ul className="navbar-nav">
      <li className="nav-item dropdown">
        <button className="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          Menu's
        </button>
        <ul className="dropdown-menu dropdown-menu-dark">

        <NavLink to={"/Admin/VehicleIndex"} >
        <a className="dropdown-item" href="#">Vehicle List</a>

        </NavLink>
        </ul>
      </li>
    </ul>
  </div>
  ) : ""
}


 {
    userStore.nameid != "" ? (

        <a type='button' className="btn btn-success " onClick={()=>handleLogout()} >Logout</a>


    ) : (

        <>
        <li className="nav-item" style={{marginRight:"5px"}}>
        <NavLink to={"/register"} >
        <a className="btn btn-success " >Register</a>

        </NavLink>
     
       
      </li>
        
        <li className="nav-item" style={{marginRight:"5px"}}>
        <NavLink to={"/login"} >
        <a className="btn btn-success " >Login</a>

        </NavLink>
     
        </li>
        
        </>

    )
 }
   


   


  
 </ul>

</div>
</div>

</nav>
    </div>
  )
}

export default Header
