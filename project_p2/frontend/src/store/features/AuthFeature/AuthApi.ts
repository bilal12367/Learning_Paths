import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const url = "http://192.168.0.7:5000/api/auth"


const AuthApi = createApi({
    reducerPath: 'auth_api',
    baseQuery: fetchBaseQuery({ baseUrl: url }),
    endpoints: (builder) => ({
        loginApi: builder.mutation({
            query: (body) => ({
                url: '/login',
                method: 'POST',
                body,
            }),
        }),
        registerApi: builder.mutation({
            query: (body) => ({
                url: '/register',
                method: 'POST',
                body
            })
        }),
        verifyToken: builder.mutation({
            query: (body) => ({
                url:'/emailVerification',
                method: 'POST',
                body
            })
        })
    })
})

export default AuthApi
export const { useLoginApiMutation, useRegisterApiMutation, useVerifyTokenMutation } = AuthApi