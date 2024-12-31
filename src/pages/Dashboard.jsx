import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEntries } from "../features/entrySlice";
import JournalEntryList from "../components/JournalEntryList";
import { Button } from "@/components/ui/button";

// HANDLE THE ERROR WHEN NO ENTRIES

const Dashboard = () => {
  const dispatch = useDispatch();
  const { entries, status, error } = useSelector((state) => state.entries);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEntries());
    }
  }, [dispatch, status]);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome Back, Srikanth!</h1>
        <p>Today's Date: {new Date().toLocaleDateString()}</p>
      </header>

      <section className="dashboard-actions">
        <Link to="/entry/new">
          <Button variant="outline">Create New Entry</Button>
        </Link>
      </section>

      <section>
        {status === "loading" && <p>Loading entries...</p>}
        {status === "failed" && <p>Error: {error}</p>}
        {status === "succeeded" && entries && (
          <JournalEntryList entries={entries} />
        )}
      </section>
    </div>
  );
};

export default Dashboard;
