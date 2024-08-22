import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { APP_API_ROUTES } from "../../utils/Constants";



const AirportSearchApi = createApi({
    reducerPath: APP_API_ROUTES.SEARCH_AIRPORT_API.reducerPath,
    baseQuery: fetchBaseQuery({ baseUrl: APP_API_ROUTES.SEARCH_AIRPORT_API.baseQuery }),
    endpoints: (builder) => ({
        airportSearch: builder.query({
            query: (searchedQuery) => ({ url: APP_API_ROUTES.SEARCH_AIRPORT_API.endpoints.SEARCH_AIRPORT + `/${searchedQuery}` })
        })
    })
})


export default AirportSearchApi;