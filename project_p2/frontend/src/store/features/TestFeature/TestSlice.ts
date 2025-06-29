import { createSlice } from "@reduxjs/toolkit"


const state = {
    counter: 0
}

const TestSlice = createSlice({
    name: "TestSlice",
    initialState: state,
    reducers: {
        increment: (state) => {
            state.counter += 1
        },
        decrement: (state) => {
            state.counter -= 1
        }
    }
})

export const testActions = TestSlice.actions;
export default TestSlice