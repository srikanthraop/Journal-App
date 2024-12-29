import { fetchEntries } from "../features/entrySlice";
import store from "../store";

export function refetchEntries() {
    store.dispatch(fetchEntries());
}
