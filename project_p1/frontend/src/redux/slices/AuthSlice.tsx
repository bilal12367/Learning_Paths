import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { APP_SLICES } from "../../utils/Constants";
import { User } from "../../utils/types";



interface AuthState {
    user: User | {},
    exists: Boolean,
    token?: String
}

const initialState: AuthState = {
    user: {},
    exists: false,
    token: ''
}

const AuthSlice = createSlice({
    name: APP_SLICES.AUTH,
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload
            state.exists = true
        },
        removeUser(state: any, action: PayloadAction<undefined>) {
            state.user = {}
            state.exists = false
            state.token = undefined
        }
    }
})

export default AuthSlice