import { createAsyncThunk } from '@reduxjs/toolkit';

import $api from '../../../http';
import { Contact } from './../../../models/Contact';

export type FetchContactParams =  {
    [Property in keyof Contact]?: any
}

export const fetchContactsByParams = createAsyncThunk(
    "contacts/fetchContactsByUserId",
    async (params: FetchContactParams, thunkApi) => {
        try {
            const { data: contacts } = await $api.get<Contact[]>("/contacts", {
                params
            });
            return contacts;
        } catch (e: any) {
            return thunkApi.rejectWithValue(e.message);
        }
    }
)
