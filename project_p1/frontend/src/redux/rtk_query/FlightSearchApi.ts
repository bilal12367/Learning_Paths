import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { APP_API_ROUTES } from "../../utils/Constants";


const FlightSearchApi = createApi({
    reducerPath: APP_API_ROUTES.SEARCH_FLIGHT_API.reducerPath,
    baseQuery: fetchBaseQuery({ baseUrl: APP_API_ROUTES.Common.baseQuery}),
    endpoints: (builder) => ({
        flightSearch: builder.query<any, String>({
            query: (searchQuery) => ``
        })
    })
})