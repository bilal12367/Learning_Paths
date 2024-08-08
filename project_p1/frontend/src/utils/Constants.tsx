

const APP_ROUTES = {
    LANDING: '/',

}


const APP_SLICES = {
    AUTH: 'Auth_Slice'
}

const APP_API_ROUTES = {
    AUTH_API: {
        reducerPath: 'Auth_Api_Reducer_Path',
        baseQuery: 'https://reqres.in/api/',
        endpoints: {
            REGISTER: 'register'
        }
    }
}

export { APP_ROUTES, APP_SLICES, APP_API_ROUTES }