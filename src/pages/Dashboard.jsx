import React, { useEffect } from "react";
import { Link, useLoaderData, useNavigation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addEntries, fetchEntries } from "../features/entrySlice";
import JournalEntryList from "../components/JournalEntryList";
import { Button } from "@/components/ui/button";
import { getEntries } from "@/services/journalEntryAPI";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { entries, status, error } = useSelector((state) => state.entries);

  const navigation = useNavigation();
  const loaderEntries = useLoaderData();
  const loaderStatus = navigation.state;

  useEffect(
    function () {
      dispatch(addEntries(loaderEntries));
    },
    [loaderEntries],
  );

  // useEffect(function () {}, [entries]);

  return (
    <div className="">
      <div className="dashboard">
        <header className="dashboard-header"></header>

        <section className="dashboard-actions">
          <Link to="/entry/new">
            <Button className="text-md ml-8 mt-8" variant="outline">
              Create New Entry
            </Button>
          </Link>
        </section>

        <section>
          {/* {state === "loading" && <p>Loading entries...</p>} */}
          {loaderStatus === "idle" && entries && (
            <JournalEntryList entries={entries} />
          )}
        </section>
      </div>
    </div>
  );
};

export async function fetchAllEntriesLoader() {
  try {
    return await getEntries();
  } catch (error) {
    throw new Response("Entries not found", { status: 404 });
  }
}

export default Dashboard;
