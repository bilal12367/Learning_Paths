import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Themes from "./Themes";


const themeSlice = createSlice({
    name: 'theme_slice',
    initialState: Themes.PrimaryTheme,
    reducers: {
        switchTheme(state, action: PayloadAction<{ theme_name: 'primary' | 'theme2' | 'theme3' }>) {
            state = Themes.PrimaryTheme
        }
    }
})

export default themeSlice