const API_URL = "http://localhost:8000/entries";
const OMDB_API_KEY = "7fb3835a";

export async function getEntries() {
  const data = await fetch(API_URL);

  if (!data.ok) {
    throw new Error("Failed to fetch entries");
  }

  return await data.json();
}

export async function getEntryById(id) {
  const data = await fetch(`${API_URL}/${id}`);

  if (!data.ok) {
    throw new Error("Failed to fetch entry");
  }

  return await data.json();
}

export async function postEntry(entry) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(entry),
  });

  if (!response.ok) {
    throw new Error("Failed to create entry");
  }

  return await response.json();
}

export async function deleteEntryById(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete entry");
  }

  return await response.json();
}

export async function putEntry(id, updatedEntry) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedEntry),
  });

  if (!response.ok) {
    throw new Error("Failed to update entry");
  }

  return await response.json();
}

//OMDB API

export async function getOMDBMovie(id) {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?i=${id}&apikey=${OMDB_API_KEY}`,
    );
    if (!response) {
      throw new Error("Failed to fetch movie from OMDB");
    }

    return await response.json();
  } catch (error) {
    throw new Error("Failed to fetch movie from OMDB " + error);
  }
}
