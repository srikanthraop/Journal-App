import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    deleteEntryById,
    getEntries,
    postEntry,
    putEntry,
} from "../services/journalEntryAPI";

const initialState = {
    entries: [],
    status: "idle",
    addStatus: "idle",
    error: null,
};

export const fetchEntries = createAsyncThunk(
    "entries/fetchEntries",
    async () => {
        const response = await getEntries();
        return response;
    }
);

export const addEntry = createAsyncThunk(
    "entries/addEntry",
    async (entry, { dispatch, rejectWithValue }) => {
        try {
            const newEntry = {
                id: crypto.randomUUID(),
                date: new Date().toISOString(),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                tags: [],
                attachments: [],
                ...entry,
                mood: Array.isArray(entry.mood) ? entry.mood : [entry.mood],
            };

            console.log(newEntry);

            const response = await postEntry(newEntry);

            // dispatch(fetchEntries());
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteEntry = createAsyncThunk(
    "entries/deleteEntry",
    async (id, { dispatch, rejectWithValue }) => {
        try {
            const response = await deleteEntryById(id);
            dispatch(fetchEntries());
            return response();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const editEntry = createAsyncThunk(
    "entries/editEntry",
    async (entry, { rejectWithValue }) => {
        try {
            const updatedEntry = {
                ...entry,
                updatedAt: new Date().toISOString(),
            };

            const response = await putEntry(entry.id, updatedEntry);

            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Slice
const entrySlice = createSlice({
    name: "entries",
    initialState,
    reducers: {
        resetStatuses(state) {
            state.status = "idle";
            state.addStatus = "idle";
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch entries
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
            })
            // Add entry
            .addCase(addEntry.pending, (state) => {
                state.addStatus = "loading";
            })
            .addCase(addEntry.fulfilled, (state, action) => {
                state.addStatus = "succeeded";
                state.entries.push(action.payload);
            })
            .addCase(addEntry.rejected, (state, action) => {
                state.addStatus = "failed";
                state.error = action.payload;
            })

            // Delete entry
            .addCase(deleteEntry.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteEntry.fulfilled, (state, action) => {
                state.loading = false;
                // Remove the deleted entry from the entries array
                state.entries = state.entries.filter(
                    (entry) => entry.id !== action.meta.arg // `action.meta.arg` contains the `id`
                );
            })
            .addCase(deleteEntry.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Error message from rejectWithValue
            })

            .addCase(editEntry.pending, (state) => {
                state.status = "loading";
            })

            .addCase(editEntry.fulfilled, (state, action) => {
                state.status = "succeeded";
                const index = state.entries.findIndex(
                    (entry) => entry.id === action.payload.id
                );
                if (index !== -1) {
                    state.entries[index] = action.payload; // Replace the old entry with the updated one
                }
            })
            .addCase(editEntry.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export const { resetStatuses } = entrySlice.actions;

export default entrySlice.reducer;
