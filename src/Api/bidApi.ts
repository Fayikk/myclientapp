import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { bidModel } from "../Interfaces/bidModel";

 const bidApi = createApi({
    reducerPath:"bidApi",
    baseQuery:fetchBaseQuery({
        baseUrl:"https://localhost:7206/api/Bid/",
    }),
    tagTypes:["Bids"],
    endpoints:(builder) => ({
        getBidByVehicleId:builder.query({
            query:(vehicleId:any) => ({
                method:"GET",
                url:`GetBidsByVehicle/${vehicleId}`,
                params:vehicleId
            }),
            providesTags:["Bids"]
        }),
        createBid:builder.mutation({
            query:(bidModel:bidModel) => ({
                method:"POST",
                url:"Create",
                body:bidModel
            }),
            invalidatesTags:["Bids"]
        }),

    })
})

export const {useGetBidByVehicleIdQuery,useCreateBidMutation} = bidApi
export default bidApi