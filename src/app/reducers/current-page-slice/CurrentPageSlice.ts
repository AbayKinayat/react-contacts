import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppRoute } from "../../../models/AppRoute";

interface PageState {
    page: AppRoute | null
};

const initialState: PageState = {
    page: null
}

export const currentPageSlice = createSlice({
    name: "currentPage",
    initialState,
    reducers: {
        setPage(state, action: PayloadAction<AppRoute>) {
            state.page = action.payload;
        },
    },
})

export const { setPage } = currentPageSlice.actions;
export default currentPageSlice.reducer;