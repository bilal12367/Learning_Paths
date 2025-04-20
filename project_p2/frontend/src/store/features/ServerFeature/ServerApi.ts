import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const url = "http://localhost:5000/api/servers"


const AuthApi = createApi({
    reducerPath: 'auth_api',
    baseQuery: fetchBaseQuery({ baseUrl: url, credentials: 'include'}),
    endpoints: (builder) => ({
        createServer: builder.mutation({
            query: (body: CreateServerDto) => ({
                url: '',
                method: 'POST',
                body,
            }),
        }),
    })
})

export default AuthApi
export const { useCreateServerMutation } = AuthApi