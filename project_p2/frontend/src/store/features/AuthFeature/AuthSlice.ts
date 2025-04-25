import { createSlice } from "@reduxjs/toolkit";
import AuthApi from "./AuthApi";

interface IAuthState {
    isUninitialized: boolean,
    userState: 'LOGGED_IN' | 'LOADING' | 'LOGGED_OUT',
    isLoading: boolean,
}

const AuthState: IAuthState = {
    isUninitialized: true,
    userState: 'LOGGED_OUT',
    isLoading: false
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
                state.isUninitialized = false;
                state.userState = 'LOADING'
                state.isLoading = true
            }
        )
        .addMatcher(
            AuthApi.endpoints.loginApi.matchFulfilled,
            (state, action) => {
                state.isLoading = false;
                state.userState = 'LOGGED_IN'
            }
        ).addMatcher(
            AuthApi.endpoints.loginApi.matchRejected,
            (state, action) => {
                state.isLoading = false;
                state.userState = 'LOGGED_OUT'
            }
        ).addMatcher(
            AuthApi.endpoints.registerApi.matchPending,
            (state,action) => {
                state.userState = 'LOADING';
                state.isLoading = true;
            }
        ).addMatcher(
            AuthApi.endpoints.registerApi.matchRejected,
            (state,action) => {
                state.userState = 'LOGGED_OUT';
                state.isLoading = false;
            }
        ).addMatcher(
            AuthApi.endpoints.registerApi.matchFulfilled,
            (state,action) => {
                state.userState = 'LOGGED_IN';
                state.isLoading = false;
            }
        ).addMatcher(
            AuthApi.endpoints.verifyUser.matchFulfilled,
            (state, action) => {
                state.userState = 'LOGGED_IN';
                state.isLoading = false
            }
        ).addMatcher(
            AuthApi.endpoints.verifyUser.matchRejected,
            (state, action) => {
                state.userState = 'LOGGED_OUT';
                state.isLoading = false;
            }
        ).addMatcher(
            AuthApi.endpoints.logout.matchPending,
            (state,action) => {
                state.userState = 'LOADING';
                state.isLoading = true
            }
        ).addMatcher(
            AuthApi.endpoints.logout.matchRejected,
            (state,action) => {
                state.userState = 'LOGGED_IN';
                state.isLoading = false
            }
        ).addMatcher(
            AuthApi.endpoints.logout.matchFulfilled,
            (state,action) => {
                state.userState = 'LOGGED_OUT';
                state.isLoading = false
            }
        )
    }
})

export default authSlice