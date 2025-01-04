import React, { useEffect } from "react";
import { Link, useNavigation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEntries } from "../features/entrySlice";
import JournalEntryList from "../components/JournalEntryList";
import { Button } from "@/components/ui/button";

// HANDLE THE ERROR WHEN NO ENTRIES
//HANDLE LOADING

const Dashboard = () => {
  const dispatch = useDispatch();
  const { entries, status, error } = useSelector((state) => state.entries);

  const navigation = useNavigation();

  useEffect(
    function () {
      if (navigation.state !== "idle") {
        console.log("DASHBOARD" + navigation.state);
      }
    },
    [navigation],
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEntries());
    }
  }, [dispatch, status]);

  return (
    <div className="dashboard">
      <header className="dashboard-header"></header>

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
