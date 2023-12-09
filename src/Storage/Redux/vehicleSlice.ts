import { createSlice } from "@reduxjs/toolkit";



const initalState = {
    vehicles:[],
    vehicleId:"",
    search:""
    
}



export const vehicleSlice = createSlice({
    name:"vehicle",
    initialState:initalState,
    reducers:{
        getVehicles:(state,action)=>{
            state.vehicles = action.payload
        },
        getVehicle:(state,action) => {
            state.vehicleId = action.payload
        },
        setSearchItem:(state,action) => {
            state.search = action.payload
        }
    }
})

export const {getVehicles,getVehicle,setSearchItem} = vehicleSlice.actions
export const vehicleReducer = vehicleSlice.reducer;