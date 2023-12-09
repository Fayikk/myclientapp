import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { createVehicleModel } from "../Interfaces/createVehicleModel"

const vehicleApi = createApi({
    reducerPath:"vehicleApi",
    baseQuery:fetchBaseQuery({
        baseUrl:"https://localhost:7206/api/Vehicle/"
    }),
    tagTypes:["vehicle"],
    endpoints:(builder)=>({
        getVehicles:builder.query({
            query:()=>({
                url:"GetVehicles"
            }),
            providesTags:["vehicle"]
        }),
        getVehicleById:builder.query({
            query:(id)=>({
                url:`${id}`
              
            })
        }),
        removeVehicle:builder.mutation({
            query:(id)=> ({
                url: `/Remove/Vehicle/${id}`,
                method:"DELETE",

            }),
            invalidatesTags:["vehicle"],

        }),
        createVehicle:builder.mutation({
            query:(vehicleModel:any) => ({
                url:"CreateVehicle",
                method:"POST",
                body:vehicleModel
              
            }),
            invalidatesTags:["vehicle"]
        }),
        updateVehicle:builder.mutation({            
            query:({createVehicle,vehicleId}) => ({
                url:`UpdateVehicle?vehicleId=${vehicleId}`,
                method:"PUT",
                body:createVehicle,
            }),
            invalidatesTags:["vehicle"]
        }),

    })
})


export const {useGetVehiclesQuery,useGetVehicleByIdQuery,useRemoveVehicleMutation,useCreateVehicleMutation,useUpdateVehicleMutation} = vehicleApi
export default vehicleApi