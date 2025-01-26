import { createSlice } from "@reduxjs/toolkit";
import AuthApi from "./AuthApi";

interface IAuthState {
    type: 'GUEST' | 'USER'
    loading: boolean,
    token: string | null,
    userName: string | null,
    email: string | null,
    error: boolean,
    errorMsg: string
}

const AuthState: IAuthState = {
    type: 'GUEST',
    loading: false,
    token: null,
    userName: null,
    email: null,
    error: false,
    errorMsg: ''
}

const authSlice = createSlice({
    name: 'authSlice',
    initialState: AuthState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addMatcher(
            AuthApi.endpoints.loginApi.matchPending,
            (state, action) => {
                state.loading = true
                state.email = null
                state.token = null
            }
        )
        .addMatcher(
            AuthApi.endpoints.loginApi.matchFulfilled,
            (state, action) => {
                state.type = 'USER'
                state.loading = true
                state.email = action.payload.email
                state.token = action.payload.token
            }
        ).addMatcher(
            AuthApi.endpoints.loginApi.matchRejected,
            (state, action) => {
                state.type = 'GUEST'
                state.loading = false
                state.email = null
                state.token = null
                state.error = true
                state.errorMsg = "Error Auth"
            }
        )
    }
})

export default authSlice