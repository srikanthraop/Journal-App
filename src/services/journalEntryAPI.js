const API_URL = "http://localhost:8000/entries";

export async function getEntries() {
    const data = await fetch(API_URL);

    if (!data.ok) {
        throw new Error("Failed to fetch entries");
    }

    return data.json();
}

export async function getEntryById(id) {
    const data = await fetch(`${API_URL}/${id}`);

    if (!data.ok) {
        throw new Error("Failed to fetch entry");
    }

    return data.json();
}
