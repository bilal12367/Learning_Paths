import { createSlice } from "@reduxjs/toolkit"
import ServerApi from "./ServerApi"

const ServerState = {
    joinedServers: [],
    isLoading: false
}

const serverSlice = createSlice({
    name: 'server_slice',
    initialState: ServerState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addMatcher(
            ServerApi.endpoints.getJoinedServers.matchPending,
            (state, action) => {
                state.isLoading = true
            }
        ).addMatcher(
            ServerApi.endpoints.getJoinedServers.matchRejected,
            (state,action) => {
                state.isLoading = false
            }
        )
    }
})

export default serverSlice