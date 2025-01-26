import authSlice from "./features/AuthFeature/AuthSlice";
import TestSlice from "./features/TestFeature/TestSlice";
import themeSlice from "./features/Theme/ThemeSlice";


const Actions = {
    testActions: TestSlice.actions,
    themeActions: themeSlice.actions,
    authActions: authSlice.actions
}

export default Actions