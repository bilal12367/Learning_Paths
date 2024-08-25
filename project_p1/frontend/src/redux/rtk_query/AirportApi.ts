import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APP_API_ROUTES } from "../../utils/Constants";
import { IAirportDetails } from "../../utils/types";


const setHeaders = (headers: Headers) => {
    headers.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmM4MWFiZDkyNWRjNzY0YWNhMjE3MzYiLCJpYXQiOjE3MjQzOTAwNzcsImV4cCI6MTc1NTkyNjA3N30.AL3pDIMkTM4KTTPN_nz7EAHNPYE6O7lRI1F0TzKjPzs')

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