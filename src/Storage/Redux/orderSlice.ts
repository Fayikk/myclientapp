import { createSlice } from "@reduxjs/toolkit";
import orderModel from "../../Interfaces/orderModel";

const initialState : orderModel = {
    userId:"",
    vehicleId:0,
    stripePaymentIntentId:"",
    clientSecret:""
}






export const orderSlice = createSlice({
    name:"order",
    initialState:initialState,
    reducers:{
        getOrderInfo:(state,action) => {
            state.userId = action.payload.userId
            state.vehicleId = action.payload.vehicleId
            state.stripePaymentIntentId = action.payload.stripePaymentIntentId
            state.clientSecret = action.payload.clientSecret
        }
    }

})

export const {getOrderInfo} = orderSlice.actions;
export const orderReducer = orderSlice.reducer