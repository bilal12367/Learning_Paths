import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const url = "http://localhost:5000/api/auth"


const AuthApi = createApi({
    reducerPath: 'auth_api',
    baseQuery: fetchBaseQuery({ baseUrl: url, credentials: 'include'}),
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
                url: '/emailVerification',
                method: 'POST',
                body
            })
        }),
        verifyUser: builder.query({
            query: () => '/verifyUser',
        }),
        logout: builder.query<void, void>({
            query: () => '/logout'
        })
    })
})

export default AuthApi
export const { useLazyVerifyUserQuery, useLoginApiMutation, useRegisterApiMutation, useVerifyTokenMutation, useLazyLogoutQuery } = AuthApi