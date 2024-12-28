import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getEntries, getEntryById } from "../services/journalEntryAPI";

const initialState = {
    entries: [],
    status: "idle",
    error: null,
};

const entrySlice = createSlice({
    name: "entries",
    initialState,
    reducers: {
        addEntry(state, action) {
            state.entries = state.entries.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEntries.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchEntries.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.entries = action.payload;
            })
            .addCase(fetchEntries.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export const fetchEntries = createAsyncThunk(
    "entries/fetchEntries",
    async function () {
        return await getEntries();
    }
);

export const { addEntry } = entrySlice.actions;

export default entrySlice.reducer;
