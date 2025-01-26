import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const url = "http://localhost:5000/api/auth"


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
            
        })
    })
})

export default AuthApi
export const { useLoginApiMutation } = AuthApi