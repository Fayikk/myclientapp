import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const accountApi = createApi({
    reducerPath:"accountApi",
    baseQuery:fetchBaseQuery({
        baseUrl:"https://localhost:7206/api/User/",
    }),
    endpoints:(builder) => ({
        signUp:builder.mutation({
            query:(userData) => ({
                url:"Register",
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body:userData
            })
        }),
        signIn:builder.mutation({
            query:(userData) => ({
                url:"Login",
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body:userData
            })
        })
    })

})


export const {useSignUpMutation,useSignInMutation} = accountApi