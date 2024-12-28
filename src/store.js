import { configureStore } from "@reduxjs/toolkit";
import entryReducer from "./features/entrySlice";

export const store = configureStore({
    reducer: {
        entries: entryReducer,
    },
});

export default store;
