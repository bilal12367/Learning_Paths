import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const url = "http://localhost:5000/api/servers"


const ServerApi = createApi({
    reducerPath: 'server_api',
    baseQuery: fetchBaseQuery({ baseUrl: url, credentials: 'include' }),
    endpoints: (builder) => ({
        createServer: builder.mutation({
            query: (body: CreateServerDto) => ({
                url: '',
                method: 'POST',
                body,
            }),
        }),
        getJoinedServers: builder.query<{ id: string, image: string, server_name: string }[], void>({
            query: () => ({
                url: `getUserJoinedServers`,
                method: 'GET',
            }),

        })
    })
})

export const { useCreateServerMutation, useGetJoinedServersQuery } = ServerApi
export default ServerApi