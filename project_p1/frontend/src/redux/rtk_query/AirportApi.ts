import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APP_API_ROUTES } from "../../utils/Constants";
import { IAirportDetails } from "../../utils/types";
import { setHeaders } from "./apiUtil";



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