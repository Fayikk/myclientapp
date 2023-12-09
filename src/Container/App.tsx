import React, { useEffect } from 'react';
import './App.css';
import { VehicleList } from '../Pages/Vehicle';
import { Header } from '../Layout';
import { Route, Routes } from 'react-router-dom';
import VehicleDetail from '../Pages/Vehicle/VehicleDetail';
import Register from '../Pages/Account/Register';
import Login from '../Pages/Account/Login';
import { useDispatch } from 'react-redux';
import { setLoggedInUser } from '../Storage/Redux/authenticationSlice';
import userModel from '../Interfaces/userModel';
import { jwtDecode } from 'jwt-decode';
import BidCheckout from '../Pages/Bid/BidCheckout';
import Payment from '../Pages/Payment/Payment';
import { CreateVehicle, VehicleIndex } from '../Pages/Admin';
import NotFound from '../Other/NotFound';
function App() {

  const Dispatch = useDispatch();
  useEffect(()=>{
    const token = localStorage.getItem("token");
    if (token) {
      const {nameid,email,role,fullName} : userModel = jwtDecode(token);
      Dispatch(setLoggedInUser({
          nameid,email,role,fullName
      }))
    }
  })




  return (
    <div className="App">
      <Header></Header>
      <div className='pb-5' >
        <Routes>
          <Route path='/' element={<VehicleList></VehicleList>} ></Route>
          <Route path='/Admin/VehicleIndex' element={<VehicleIndex></VehicleIndex>} ></Route>
          <Route path='/Admin/CreateVehicle/:vehicleId?' element={<CreateVehicle></CreateVehicle>} ></Route>
            <Route path='Vehicle/VehicleId/:vehicleId' element={<VehicleDetail></VehicleDetail>} ></Route>
            <Route path='Register' element={<Register></Register>} ></Route>
            <Route path='Login' element={<Login></Login>} ></Route>
            <Route path='Vehicle/BidCheckout/:vehicleId' element={<BidCheckout></BidCheckout>} ></Route>
            <Route path='Payment' element={<Payment></Payment>} ></Route>
            <Route path='*' element={<NotFound></NotFound>} ></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
