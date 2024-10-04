import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APP_API_ROUTES } from "../../utils/Constants";
import { IAirportDetails } from "../../utils/types";


const setHeaders = (headers: Headers) => {
    headers.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmZkNmZkYjA2ODg4ZWVjNWM0ZGY0NzYiLCJpYXQiOjE3Mjc4OTE4MjMsImV4cCI6MTc1OTQyNzgyM30.fzfawgAkodApaiko2uVIXHNYMkhBn_23qiJLWj0cUwI')

}

const AirportSearchApi = createApi({
    reducerPath: APP_API_ROUTES.SEARCH_AIRPORT_API.reducerPath,
    baseQuery: fetchBaseQuery({ baseUrl: APP_API_ROUTES.SEARCH_AIRPORT_API.baseQuery, prepareHeaders: setHeaders}),
    endpoints: (builder) => ({
        airportSearch: builder.query<IAirportDetails[], String>({
            query: (searchedQuery) => `?airportStr=${searchedQuery}`,
        })
    })
})




export default AirportSearchApi;