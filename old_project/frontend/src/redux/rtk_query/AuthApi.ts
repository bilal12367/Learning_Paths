import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { APP_API_ROUTES } from '../../utils/Constants'

interface RegisterBody {
    email: String,
    password: String
}

const AuthApi = createApi({
    reducerPath: APP_API_ROUTES.AUTH_API.reducerPath,
    baseQuery: fetchBaseQuery({ baseUrl: APP_API_ROUTES.AUTH_API.baseQuery }),
    endpoints: (builder) => ({
        registerApi: builder.mutation({
            query: (body: RegisterBody) => ({
                url: APP_API_ROUTES.AUTH_API.endpoints.REGISTER,
                method: 'POST',
                body
            })
        })
    })
})


export default AuthApi