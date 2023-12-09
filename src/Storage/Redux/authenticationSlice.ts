import { createSlice } from "@reduxjs/toolkit";
import userModel from "../../Interfaces/userModel";
import { act } from "react-dom/test-utils";


export const InitialState : userModel = {
    nameid:"",
    fullName:"",
    email:"",
    role:""
}


export const authenticationSlice = createSlice({
    name:"authentication",
    initialState:InitialState,
    reducers:{
        setLoggedInUser:(state,action)=> {
            state.email = action.payload.email;
            state.fullName = action.payload.fullName;
            state.nameid = action.payload.nameid;
            state.role = action.payload.role
        }
    }
})

export const {setLoggedInUser} = authenticationSlice.actions
export const authenticationReducer = authenticationSlice.reducer;