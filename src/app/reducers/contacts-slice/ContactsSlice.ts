import { message } from 'antd';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { fetchContactsByParams } from './actionCreators';
import { Contact } from "../../../models/Contact";

interface ContactState {
    contacts: Contact[],
    isLoading: boolean,
    isSuccess: boolean,
    error: string,
};

const initialState: ContactState = {
    contacts: [],
    isLoading: false,
    isSuccess: false,
    error: "",
}

export const contactsSlice = createSlice({
    name: "contacts",
    initialState,
    reducers: {
    },
    extraReducers: {
        [fetchContactsByParams.fulfilled.type]: (state, action: PayloadAction<Contact[]>) => {
            state.isLoading = false;
            state.error = "";
            state.contacts = action.payload;
            state.isSuccess = true;
        },
        [fetchContactsByParams.pending.type]: (state, action) => {
            state.isLoading = true;
        },
        [fetchContactsByParams.rejected.type]: (state, action) => {
            message.error(action.payload);
            state.isSuccess = false;
            state.isLoading = false;
        },
    }
})

export default contactsSlice.reducer;