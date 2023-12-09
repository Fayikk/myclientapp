import React, { useState } from 'react'
import { useSignUpMutation } from '../../Api/accountApi'
import { SD_ROLES } from '../../Interfaces/enums/SD_ROLES';
import { apiResponse } from '../../Interfaces/apiResponse';
import { useNavigate } from 'react-router-dom';
import ToastrNotify from '../../Helper/ToastrNotify';
function Register() {
    const Navigate = useNavigate();
    const [userData,setUserDataState] = useState({
        username:"",
        fullname:"",
        password:"",
        userType:""
    });



    const [userRegisterMutation] = useSignUpMutation();
    const handleRegistrationSubmit = async () =>{
        const response : apiResponse = await userRegisterMutation({
            username:userData.username,
            fullname:userData.fullname,
            password:userData.password,
            userType:userData.userType
        })
        if (response.data?.isSuccess) {
          ToastrNotify("You are successfully sign up","success");
          Navigate("/");
        }
        if(!response.data?.isSuccess){
          if (response.data !== undefined && response.data.errorMessages !== undefined) {
          ToastrNotify(response.data.errorMessages[0],"error");

          }
          
        }
    }




  return (
     <section>
    <div className="container">
      
      <div className="alert alert-warning text-center my-4">
        For Example
      </div>
      
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-8 col-xl-6">
          <div className="row">
            <div className="col text-center">
              <h1>Register</h1>
              <p className="text-h3">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia. </p>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col mt-4">
              <input type="text" className="form-control" placeholder="Fullname" onChange={(e) => setUserDataState((prevState) => {return {...prevState,fullname:e.target.value}})} />
            </div>
          </div>
          <div className="row align-items-center mt-4">
            <div className="col">
              <input type="email" className="form-control" placeholder="Email" onChange={(e) => setUserDataState((prevState) => {return {...prevState,username:e.target.value}})} />
            </div>
          </div>
          <div className="row align-items-center mt-4">
            <div className="col">
              <input type="password" className="form-control" placeholder="Password" onChange={(e) => setUserDataState((prevState) => {return {...prevState,password:e.target.value}})}/>
            </div>
            <div className="col">
                <select className='form-control' placeholder='Choose-role' onChange={(e) => setUserDataState((prevState) => {return {...prevState,userType:e.target.value}})} >
                    <option value={SD_ROLES.Seller} >Seller</option>
                    <option value={SD_ROLES.NormalUser}  >Normally</option>
                </select>
            </div>
          </div>
          <div className="row justify-content-start mt-4">
            <div className="col">
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox" className="form-check-input"/>
                  I Read and Accept <a href="https://www.froala.com">Terms and Conditions</a>
                </label>
              </div>

              <button className="btn btn-primary mt-4" onClick={()=>handleRegistrationSubmit()} >Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Register
