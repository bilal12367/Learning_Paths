import AuthSlice from "./slices/AuthSlice";
import SearchSlice from './slices/SearchSlice';

export const RootActions = {
    Auth: AuthSlice.actions,
    Search: SearchSlice.actions
}