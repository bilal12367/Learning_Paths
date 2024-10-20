import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ISearchSliceState = {
    searchType: null,
    from: null,
    to: null,
    travelDate: null,
    passengers: null
}

const slice = createSlice({
    name: "Search_Slice",
    initialState,
    reducers: {
        setFlightSearchDetails(state, action: PayloadAction<ISearchSliceState>) {
            const payload = action.payload;
            state.from = payload.from;
            state.to = payload.to;
            state.passengers = {}
            state.searchType = 'flight'
        }
    }
})

export default slice;