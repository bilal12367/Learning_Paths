import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const dialogManagerState: IDialogManager = {
    dialogType: 'NONE',
    isOpen: false,
    dialogProps: {}
}

const dialogManagerSlice = createSlice({
    name: 'dialog_manager_slice',
    initialState: dialogManagerState,
    reducers: {
        loadDialog: (state, action: PayloadAction<IDialogManager>) => {
            state.dialogType = action.payload.dialogType
            state.isOpen = true
            state.dialogProps = action.payload.dialogProps
        },
        openDialog: (state) => {
            state.isOpen = true
        },
        unloadDialog: (state, action) => {
            state.isOpen = false;
            state.dialogType = 'NONE'
            state.dialogProps = {}
        },
        closeDialog: (state) => {
            state.isOpen = false
        }
    }
})

export const dialogManagerActions = dialogManagerSlice.actions;

export default dialogManagerSlice