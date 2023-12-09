import React from 'react'
import userModel from '../Interfaces/userModel';
import { jwtDecode } from 'jwt-decode';
import { SD_ROLES } from '../Interfaces/enums/SD_ROLES';


const withAdminAuth = (WrappedComponent:any)  => {
        return(props:any) => {
            const token = localStorage.getItem("token");
            if (token!=null) {
                const decode : userModel = jwtDecode(token);
                if (decode.role !== SD_ROLES.Administrator) {
                    window.location.replace("/accessDenied");
                    return null;
                }
            }
            else {
                window.location.replace("/login")
                return null;
            }
            return <WrappedComponent {...props} ></WrappedComponent>
        } 
}



export default withAdminAuth
