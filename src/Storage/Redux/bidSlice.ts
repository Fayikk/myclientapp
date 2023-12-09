import { createSlice } from "@reduxjs/toolkit";

export const InitialState:any = {
    auctionBid:Number
}


export const bidSlice = createSlice({
    name:"Bid",
    initialState:InitialState,
    reducers:{
        setBidChange:(state,action) => {
            state.auctionBid = action.payload
        }
    }
})

export const {setBidChange} = bidSlice.actions
export const bidReducer = bidSlice.reducer