import { IRootState } from "./store";

const Selectors = {
    selectTheme : (state: IRootState) => state.theme,
    selectTypography : (state: IRootState) => state.theme.typography,
    selectAuth: (state: IRootState) => state.auth
}


export default Selectors